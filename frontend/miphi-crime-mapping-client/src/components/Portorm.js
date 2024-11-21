import React from "react";

function Portorm() {
    const [title, setTitle] = React.useState("");
    const [id, setId] = React.useState(0);
    const [text, setText] = React.useState("");
    
    const getText = async () => {

        const response = await fetch('https://localhost:7218/api/merge', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: id,
              title: title
            })
        });
        
        if(response.ok) {
            const data = await response.json();
            setText(data);
        }
        else {
            const data = "error";
            setText(data);
        }
    }

    return (
        <div className="Portorm">
            <p id="text">{text}</p>
                <label htmlFor="name">Title:</label>
                <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                <label htmlFor="name">ID:</label>
                <input type="number" name="id" value={id} onChange={(e) => setId(e.target.value)}/>
                <button type="submit" onClick={() => getText()}>Send</button>
        </div>
    );
}

export default Portorm;