export {getStats}

export interface Stats {
    label: string;
    labelColor?: string;
    dual?: {label: string, value: number}[];
    value?: number;
    description: string;
    currency?: string;
    decimals?: number;
}

const getStats = (walletdonations, goalADA, isTablet) => {
    const treesPlanted = {
        label: "Trees Planted",
        labelColor: "lightgreen",
        dual: [
            { label: "In Pot", value: 3744 },
            { label: "In Ground", value: 2443 },
        ],
        description:
            "In Pot- total seeds or seedlings planted either in germinator or pot, and the total in Ground- seedlings or young trees planted in the ground at site.",
    };

    const donatedADA =  {
        label: "Donated",
        labelColor: "orange",
        value: walletdonations,
        description:
            "Total ADA donated either by pools or direct donation. This data is directly fetched from the Cardano blockchain.",
        currency: "₳",
    };

    const hoursWorked =  {
        label: "Hours Worked",
        labelColor: "lightgreen",
        value: 8928,
        description:
            "Total number of hours worked and paid for by the project.",
    };

    const initialGoal =    {
        label: "Initial Goal",
        labelColor: "orange",
        value: goalADA,
        description: "Goal for phase one, Ranomafana site, 3.6 hectares.",
        currency: "₳",
    };

    const regeneratedHectares =   {
        label: "Regenerated Hectares",
        labelColor: "lightgreen",
        value: 3.6,
        description:
            "Total hectares regenerated between three sites, starting with Ranomafana site.",
        decimals: 1,
    };

    const stakePools =  {
        label: "Stake Pools",
        labelColor: "orange",
        value: 25,
        description:
            "Number of official CNC Ala ISPO pools. These SPOs are donating 85 ADA from the first block minted every epoch (fixed fee).",
    };

    const stats = isTablet ?  [ 
        treesPlanted,
        donatedADA,
        hoursWorked,
        initialGoal,
        regeneratedHectares,
        stakePools
    ] : [
        treesPlanted,
        hoursWorked,
        regeneratedHectares,
        donatedADA,
        initialGoal,
        stakePools
    ];

    return stats;
}