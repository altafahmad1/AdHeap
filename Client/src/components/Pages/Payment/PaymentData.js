export const months = [
    {value: "01"},
    {value: "02"},
    {value: "03"},
    {value: "04"},
    {value: "05"},
    {value: "06"},
    {value: "07"},
    {value: "08"},
    {value: "09"},
    {value: "10"},
    {value: "11"},
    {value: "12"}
];

const date = new Date();

export const years = [
    {value: date.getFullYear().toString()},
    {value: (date.getFullYear()+1).toString()},
    {value: (date.getFullYear()+2).toString()},
    {value: (date.getFullYear()+3).toString()},
    {value: (date.getFullYear()+4).toString()},
    {value: (date.getFullYear()+5).toString()},
    {value: (date.getFullYear()+6).toString()},
    {value: (date.getFullYear()+7).toString()},
    {value: (date.getFullYear()+8).toString()},
    {value: (date.getFullYear()+9).toString()},
]