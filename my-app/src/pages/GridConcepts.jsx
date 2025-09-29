import React from "react";

const StickyGrid = () => {
    return (
        <div className="grid grid-cols-2 gap-4 p-4">
            {/* Sticky Column */}
            <div className="sticky top-[100px] self-start bg-gray-100 p-4 border rounded">
                <h2 className="text-xl font-bold mb-2">Sticky Content</h2>
                <p>
                    This content will stay visible as you scroll down the right column.
                </p>
                <p>Keep adding more content here as needed.</p>
            </div>

            {/* Scrollable Column */}
            <div className="space-y-4">
                {Array.from({ length: 20 }).map((_, idx) => (
                    <div
                        key={idx}
                        className="bg-blue-100 p-4 rounded shadow-sm"
                    >
                        Scrollable Item {idx + 1}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StickyGrid;
