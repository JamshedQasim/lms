import { Webhook } from "svix";
import User from "../models/User.js";

//Api controller function to manage clerk user with database
export const clerkWebhook = async (req, res) => { 
    try {
        const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        await webhook.verify(JSON.stringify(req.body){
            id: req.headers["svix-id"],
            timestamp: req.headers["svix-timestamp"],
            signature: req.headers["svix-signature"]
        });
        const { data, type } = req.body;
        switch (type) {
            case "user.created": {
                const user = new User({
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    imageUrl: data.image_url,
                });
                await user.Create(UserData);
                res.JSON({ message: "User created successfully", user });
                break;
            }
            case "user.updated": {
                const user = await User.findById(data.id);
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
                user.email = data.email_addresses[0].email_address;
                user.name = data.first_name + " " + data.last_name;
                user.imageUrl = data.image_url;
                await user.findByIdAndUpdate(data.id, UserData, { new: true });
                res.json({ message: "User updated successfully", user });
                break;
            }
            case "user.deleted": {
                const user = await User 
                .findByIdAndDelete(data.id);
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }   
                res.json({ message: "User deleted successfully", user });
                break;
            }
            default:
                res.status(400).json({ message: "Event type not supported" });
        }   
    } catch (error) {
        console.error("Error processing webhook:", error);
        res.status(400).json({ message: "Invalid webhook" });
    }
    
};