function getSkills() {
    var links = [
        { source: "Scala", target: "Functional Programming" },
        { source: "Functional Programming", target: "Haskell" },
        { source: "Functional Programming", target: "PureScript" },
        { source: "Functional Programming", target: "Rust" },
        { source: "SQL", target: "NoSQL" },
        { source: "SQL", target: "PostgreSQL" },
        { source: "NoSQL", target: "MongoDB" },
        { source: "NoSQL", target: "Cassandra" },
        { source: "NoSQL", target: "Redis" },
        { source: "NoSQL", target: "Kafka" },
        { source: "NoSQL", target: "ElasticSearch" },
        { source: "Docker", target: "Kubernetes" },
        { source: "Art", target: "Design" },
        { source: "Art", target: "Illustration" },
        { source: "Advocacy", target: "Educational Content" },
        { source: "Advocacy", target: "Technical Writing" },
        { source: "Advocacy", target: "Mentorship" },
    ];

    var nodes = {};

    links.forEach(function (link) {
        link.source = nodes[link.source] || (nodes[link.source] = { name: link.source });
        link.target = nodes[link.target] || (nodes[link.target] = { name: link.target });
    });

    var skillsCard = document.getElementById("skills-svg").parentNode;
    var width = skillsCard.offsetWidth, height = skillsCard.offsetHeight;
    var linkDistance = width > 400 ? 80 : 40;
    var charge = width > 400 ? -500 : -150;

    var force = d3.layout.force()
        .nodes(d3.values(nodes))
        .links(links)
        .size([width, height])
        .linkDistance(linkDistance)
        .charge(charge)
        .on("tick", tick)
        .start();

    var svg = d3.select("#skills-svg")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    var link = svg.selectAll(".link")
        .data(force.links())
        .enter().append("line")
        .attr("class", "link")
        .style("fill", "none")
        .style("stroke", "#FCF6BD")
        .style("stroke-width", 1.5);

    var node = svg.selectAll(".node")
        .data(force.nodes())
        .enter().append("g")
        .attr("class", "node")
        .on("mouseover", mouseover)
        .on("mouseout", mouseout)
        .call(force.drag);

    node.append("circle")
        .attr("r", 8)
        .style("fill", "#ef6faa")
        .style("stroke-width", 1.5);

    node.append("text")
        .attr("x", 12)
        .style("fill", "#fff")
        .attr("dy", ".35em")
        .style("pointer-events", "none")
        .text(function (d) {
            return d.name;
        });

    function tick() {
        link.attr("x1", function (d) {
            return d.source.x;
        }).attr("y1", function (d) {
            return d.source.y;
        }).attr("x2", function (d) {
            return d.target.x;
        }).attr("y2", function (d) {
            return d.target.y;
        });

        node.attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });
    }

    function mouseover() {
        d3.select(this).select("circle").transition()
            .duration(750)
            .attr("r", 12);
    }

    function mouseout() {
        d3.select(this).select("circle").transition()
            .duration(750)
            .attr("r", 8);
    }
}
