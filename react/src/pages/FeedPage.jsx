import { useState } from "react"


export default function FeedPage() {
    const [category, setCategory] = useState(null);

    return (
        <div className="px-8 pt-16 border-t border-t-gray-200">
            <div>
                <h1>Filter by Category</h1>
                <div>
                    <input type="radio" id="chicken" value="chicken"
                            onClick={(e) => setCategory(e.target.value)}
                            checked={category === "chicken"}
                    />
                    <label htmlFor="chicken">Chicken</label>
                </div>
                <div>
                    <input type="radio" id="pizza" value="pizza"
                            onClick={(e) => setCategory(e.target.value)}
                            checked={category === "pizza"}
                    />
                    <label htmlFor="pizza">Pizza</label>
                </div>
                <div>
                    <input type="radio" id="hamburger" value="hamburger"
                            onClick={(e) => setCategory(e.target.value)}
                            checked={category === "hamburger"}
                    />
                    <label htmlFor="hamburger">Hamburger</label>
                </div>
                <div>
                    <input type="radio" id="hamburger" value="marlar xiangou"
                            onClick={(e) => setCategory(e.target.value)}
                            checked={category === "marlar xiangou"}
                    />
                    <label htmlFor="marlar xiangou">Marlar Xiangou</label>
                </div>
                <div>
                    <input type="radio" id="bubble tea" value="bubble tea"
                            onClick={(e) => setCategory(e.target.value)}
                            checked={category === "bubble tea"}
                    />
                    <label htmlFor="bubble tea">Bubble Tea</label>
                </div>
            </div>
        </div>
    )
}
