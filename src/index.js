export default {
	async fetch(request, env, ctx) {
	  const url = new URL(request.url);
	  const path = url.pathname;

	  // 匹配 /gallery/{uid}.png
	  const match = path.match(/^\/gallery\/([a-zA-Z0-9_-]+)\.png$/);
	  if (!match) {
		// 仿 Amazon S3 的 404 错误响应
		const notFoundHtml = `
		  <Error>
			<Code>NoSuchKey</Code>
			<Message>The specified key does not exist.</Message>
			<Key>${path.replace(/^\/+/, '')}</Key>
			<RequestId>${crypto.randomUUID()}</RequestId>
			<HostId>${crypto.randomUUID().replace(/-/g, '')}</HostId>
		  </Error>
		`.trim();

		return new Response(notFoundHtml, {
		  status: 404,
		  headers: {
			"Content-Type": "application/xml",
			"Server": "AmazonS3"
		  }
		});
	  }

	  const uid = match[1];
	  const ip = request.headers.get("cf-connecting-ip") || "unknown";
	  const userAgent = request.headers.get("user-agent") || "unknown";
	  const referer = request.headers.get("referer") || "unknown";
	  const timestamp = new Date().toISOString();

	  // 控制台日志
	  console.log(`[${timestamp}] Tracking hit: uid=${uid}, ip=${ip}`);
	  console.log(`User-Agent:${userAgent}`);
	  console.log(`Referer: ${referer}`);

	  try {
		await env.DB.prepare(
		  `INSERT INTO tracking_events (uid, ip, user_agent, referer) VALUES (?, ?, ?, ?)`
		).bind(uid, ip, userAgent, referer).run();
	  } catch (e) {
		console.error("D1 write error:", e);
	  }

	  // 返回透明 1x1 PNG
	  const base64PNG =
		"iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9YzA+wAAAABJRU5ErkJggg==";
	  const binary = Uint8Array.from(atob(base64PNG), c => c.charCodeAt(0));

	  return new Response(binary, {
		headers: {
		  "Content-Type": "image/png",
		  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
		  "Expires": "0",
		  "Pragma": "no-cache"
		},
		status: 200
	  });
	}
  };
