export {getStats}

const getStats = (walletdonations, goalADA, isTablet) => {
    const stats = isTablet ?  [ 
        {
            label: "Trees Planted",
            labelColor: "lightgreen",
            dual: [
                { label: "In Pot", value: 3101 },
                { label: "In Ground", value: 2443 },
            ],
            description:
                "In Pot- total seeds or seedlings planted either in germinator or pot, and the total in Ground- seedlings or young trees planted in the ground at site.",
        },
        {
            label: "Donated",
            labelColor: "orange",
            value: walletdonations,
            description:
                "Total ADA donated either by pools or direct donation. This data is directly fetched from the Cardano blockchain.",
            currency: "₳",
        },
        {
            label: "Hours Worked",
            labelColor: "lightgreen",
            value: 7632,
            description:
                "Total number of hours worked and paid for by the project.",
        },
        {
            label: "Initial Goal",
            labelColor: "orange",
            value: goalADA,
            description: "Goal for phase one, Ranomafana site, 3.6 hectares.",
            currency: "₳",
        },
        {
            label: "Regenerated Hectares",
            labelColor: "lightgreen",
            value: 3.6,
            description:
                "Total hectares regenerated between three sites, starting with Ranomafana site.",
            decimals: 1,
        },
        {
            label: "Stake Pools",
            labelColor: "orange",
            value: 25,
            description:
                "Number of official CNC Ala ISPO pools. These SPOs are donating 85 ADA from the first block minted every epoch (fixed fee).",
        }
    ] : [
        {
            label: "Trees Planted",
            labelColor: "lightgreen",
            dual: [
                { label: "In Pot", value: 3101 },
                { label: "In Ground", value: 2443 },
            ],
            description:
                "In Pot- total seeds or seedlings planted either in germinator or pot, and the total in Ground- seedlings or young trees planted in the ground at site.",
        },
        {
            label: "Hours Worked",
            labelColor: "lightgreen",
            value: 7632,
            description:
                "Total number of hours worked and paid for by the project.",
        },
        {
            label: "Regenerated Hectares",
            labelColor: "lightgreen",
            value: 3.6,
            description:
                "Total hectares regenerated between three sites, starting with Ranomafana site.",
            decimals: 1,
        },
        {
            label: "Donated",
            labelColor: "orange",
            value: walletdonations,
            description:
                "Total ADA donated either by pools or direct donation. This data is directly fetched from the Cardano blockchain.",
            currency: "₳",
        },
        {
            label: "Initial Goal",
            labelColor: "orange",
            value: goalADA,
            description: "Goal for phase one, Ranomafana site, 3.6 hectares.",
            currency: "₳",
        },
    
        {
            label: "Stake Pools",
            labelColor: "orange",
            value: 25,
            description:
                "Number of official CNC Ala ISPO pools. These SPOs are donating 85 ADA from the first block minted every epoch (fixed fee).",
        }
    ];

    return stats;
}