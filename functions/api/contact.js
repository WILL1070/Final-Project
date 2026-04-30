export async function onRequestPost(context) {
    try {
        // Parse the incoming JSON request
        const formData = await context.request.json();
        
        const { name, email, message } = formData;
        
        // Basic validation
        if (!name || !email || !message) {
            return new Response(JSON.stringify({ error: "All fields are required" }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }
        
        // Insert into D1 Database bound as context.env.DB
        const { success } = await context.env.DB.prepare(
            "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)"
        ).bind(name, email, message).run();
        
        if (success) {
            return new Response(JSON.stringify({ message: "Success" }), {
                status: 200,
                headers: { "Content-Type": "application/json" }
            });
        } else {
            throw new Error("Failed to insert into database");
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
