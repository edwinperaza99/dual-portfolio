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
		const login = searchParams.get("channel");

		if (!login) {
			return NextResponse.json(
				{ error: "Missing ?channel parameter" },
				{ status: 400 }
			);
		}

		// Get user ID
		const userRes = await fetch(
			`https://api.twitch.tv/helix/users?login=${login}`,
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

		// Get Channel Emotes
		const emotesRes = await fetch(
			`https://api.twitch.tv/helix/chat/emotes?broadcaster_id=${userId}`,
			{
				headers: {
					"Client-ID": clientId,
					Authorization: `Bearer ${appAccessToken}`,
				},
			}
		);

		const emotes = await emotesRes.json();
		return NextResponse.json(emotes);
	} catch (err) {
		console.error(err);
		return NextResponse.json(
			{ error: "Failed to fetch emotes" },
			{ status: 500 }
		);
	}
}
