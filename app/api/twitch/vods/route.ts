import { NextResponse } from "next/server";

const clientId = process.env.TWITCH_CLIENT_ID!;
const clientSecret = process.env.TWITCH_CLIENT_SECRET!;
let appAccessToken = "";

async function getAppToken() {
	const res = await fetch("https://id.twitch.tv/oauth2/token", {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: new URLSearchParams({
			client_id: clientId,
			client_secret: clientSecret,
			grant_type: "client_credentials",
		}),
	});
	const data = await res.json();
	appAccessToken = data.access_token;
}
export async function GET(req: Request) {
	try {
		if (!appAccessToken) await getAppToken();

		const { searchParams } = new URL(req.url);
		const limit = parseInt(searchParams.get("limit") || "3", 10);

		// Get user ID
		const userRes = await fetch(
			`https://api.twitch.tv/helix/users?login=tofubinbin`,
			{
				headers: {
					"Client-ID": clientId,
					Authorization: `Bearer ${appAccessToken}`,
				},
			}
		);
		const userData = await userRes.json();
		const userId = userData.data?.[0]?.id;
		if (!userId)
			return NextResponse.json({ error: "User not found" }, { status: 404 });

		// Get VODs
		const vodRes = await fetch(
			`https://api.twitch.tv/helix/videos?user_id=${userId}&first=${limit}&type=archive`,
			{
				headers: {
					"Client-ID": clientId,
					Authorization: `Bearer ${appAccessToken}`,
				},
			}
		);
		const vods = await vodRes.json();

		console.log("Fetching", limit, "VODs");
		console.log("Response:", vods); // ✅ FIXED

		return NextResponse.json(vods);
	} catch (err) {
		console.error(err);
		return NextResponse.json(
			{ error: "Failed to fetch VODs" },
			{ status: 500 }
		);
	}
}
