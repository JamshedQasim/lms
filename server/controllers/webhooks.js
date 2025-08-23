import { Webhook } from "svix";
import User from "../models/User.js";

// Api controller function to manage clerk user with database
export const clerkWebhook = async (req, res) => {
	try {
		const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
		await webhook.verify(
			req.body instanceof Buffer ? req.body.toString("utf8") : JSON.stringify(req.body),
			{
				id: req.headers["svix-id"],
				timestamp: req.headers["svix-timestamp"],
				signature: req.headers["svix-signature"],
			}
		);

		const { data, type } = req.body instanceof Buffer ? JSON.parse(req.body.toString("utf8")) : req.body;

		switch (type) {
			case "user.created": {
				const createdUser = await User.create({
					_id: data.id,
					email: data.email_addresses?.[0]?.email_address,
					name: `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim(),
					imageUrl: data.image_url,
				});
				return res.json({ message: "User created successfully", user: createdUser });
			}
			case "user.updated": {
				const update = {
					email: data.email_addresses?.[0]?.email_address,
					name: `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim(),
					imageUrl: data.image_url,
				};
				const updatedUser = await User.findByIdAndUpdate(data.id, update, { new: true });
				if (!updatedUser) {
					return res.status(404).json({ message: "User not found" });
				}
				return res.json({ message: "User updated successfully", user: updatedUser });
			}
			case "user.deleted": {
				const deletedUser = await User.findByIdAndDelete(data.id);
				if (!deletedUser) {
					return res.status(404).json({ message: "User not found" });
				}
				return res.json({ message: "User deleted successfully", user: deletedUser });
			}
			default:
				return res.status(400).json({ message: "Event type not supported" });
		}
	} catch (error) {
		console.error("Error processing webhook:", error);
		return res.status(400).json({ message: "Invalid webhook" });
	}
};