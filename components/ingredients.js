export default function Ingredients({ ingredients }) {
    return (
        <div>
            <h3>Ingredients</h3>
            <ul className="list-disc px-5">
                {ingredients.map(({ ingredient: { name }, amount }, key) => (
                    <li key={key}>
                        {amount} {name}
                    </li>
                ))}
            </ul>
        </div>
    );
}
