let all_times = []
let all_productivity = []

const margin = { top: 20, right: 30, bottom: 40, left: 40 };
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

function updateStudyChart(data) {
    console.log("Data received by D3:", data);

    d3.select("#chart-container").selectAll("*").remove();

    if (!data || data.length === 0) {
        return;
    }

    const svg = d3.select("#chart-container")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const x = d3.scaleBand()
        .domain(data.map(d => d.subject))
        .range([0, width])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.duration)])
        .nice()
        .range([height, 0]);


    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.subject))
        .attr("y", d => y(Number(d.duration)))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(Number(d.duration)))
        .attr("fill", "#7f56d9");

    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));
    
    svg.append("g")
        .call(d3.axisLeft(y));

}