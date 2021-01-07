import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LinkService } from '../../services/link-service/link.service'
import { DeviceService } from '../../services/device-service/device.service'
import * as d3 from 'd3';
import { Device } from 'src/app/entities/device';
import { Link } from 'src/app/entities/topology-link';
import { style } from '@angular/animations';

interface Graph {
  nodes: Device[];
  links: Link[];
}


@Component({
  selector: 'app-topology',
  templateUrl: './topology.component.html',
  styleUrls: ['./topology.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [LinkService, DeviceService]
})
export class TopologyComponent implements OnInit {
  constructor(private linkService: LinkService, private deviceService: DeviceService) { }
  links;
  ngOnInit() {
    this.deviceService.getDevices().subscribe(devices => {
      this.linkService.getLinks().subscribe(linksData => {
        const newLinks: Link[] = [];

        linksData.forEach(x => {
          newLinks.push({ source: x.src.device, target: x.dst.device } as Link)
        });


        const nodes: Device[] = [];
        const links: Link[] = [];

        devices.forEach((d) => {
          nodes.push(<Device>d);
        });

        newLinks.forEach((d) => {
          links.push(<Link>d);
        });
        const graph: Graph = <Graph>{ nodes, links };

        const link = svg.append('g')
          .attr('class', 'links')
          .selectAll('line')
          .data(graph.links)
          .enter()
          .append('line')
          .attr('stroke-width', 5)

        const node = svg.append('g')
          .attr('class', 'nodes')
          .selectAll('circle')
          .data(graph.nodes)
          .enter()
          .append('circle')
          .attr("id", "circle")
          .attr('r', 10)
          .attr('fill', "black")

        var div = d3.select("body").append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);

        var mouseover = function (d) {

          div
            .transition()
            .duration(200)
            .style("opacity", .9);
          div.html(`<div style="  font: 18px sans-serif;margin-top:5px;">${d.id}</div>
          <hr style="margin-top:5px;">
          <div style="  font: 15px sans-serif;">
          Type:${d.type}
          Address:${d.annotations.managementAddress}
          Mfr:${d.mfr}<br/>
          Hw:${d.hw}
          </div>`)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
        }

        var mouseleave = function (d) {
          div
            .transition()
            .duration(500)
            .style("opacity", 0);
        }

        node.on("mouseover", mouseover)
          .on("mouseleave", mouseleave)

        // .append('svg')
        // .attr("height", "100")
        // .attr("width", "100")
        // var image = node
        //   .append('defs')
        // image.append("pattern")
        //   .attr("patternUnits", "userSpaceOnUse")
        //   .attr("height", "50")
        //   .attr("width", 50)
        //   .append("image")
        //   .attr("id", "image")
        //   .attr("x", 0)
        //   .attr("y", 0)
        //   .attr("height", 50)
        //   .attr("width", 50)
        //   .attr("xlink:href", "assets/switch.png")

        // var asd = node
        //   .append("circle")
        //   .attr('r', 15)
        //   .attr("fill", "transparent")
        //   .attr("stroke", "aqua")
        //   .attr("fill", "url(#image)")

        // svg.selectAll('circle').call(d3.drag()
        //   .on('start', dragstarted)
        //   .on('drag', dragged)
        //   .on('end', dragended)
        // );


        simulation
          .nodes(graph.nodes)
          .on('tick', ticked);

        simulation.force<d3.ForceLink<any, any>>('link')
          .links(graph.links);

        function ticked() {
          link
            .attr('x1', function (d: any) { return d.source.x; })
            .attr('y1', function (d: any) { return d.source.y; })
            .attr('x2', function (d: any) { return d.target.x; })
            .attr('y2', function (d: any) { return d.target.y; });

          // image
          //   .attr('cx', function (d: any) { return d.x; })
          //   .attr('cy', function (d: any) { return d.y; });
          node
            .attr('cx', function (d: any) { return d.x; })
            .attr('cy', function (d: any) { return d.y; });

        }

        //this.forceGraph(devices, this.newLinks);
      });
    });
    console.log('d3.js version:', d3['version']);
    console.log('D3.js version:', d3['version']);

    const svg = d3.select('svg');
    const width = +svg.attr('width');
    const height = +svg.attr('height');

    const color = d3.scaleOrdinal(d3.schemeCategory20);

    const simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id((d: any) => d.id))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2));



    function dragstarted(d) {
      if (!d3.event.active) { simulation.alphaTarget(0.3).restart(); }
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(d) {
      if (!d3.event.active) { simulation.alphaTarget(0); }
      d.fx = null;
      d.fy = null;
    }
  }

  // forceGraph(devices: any, links: any) {
  //   const graph = {
  //     nodes: devices,
  //     links: links
  //   };

  //   const canvas: any = d3.select('#network');
  //   const r = 20;
  //   const width = canvas.attr('width');
  //   const height = canvas.attr('height');
  //   const context = canvas.node().getContext('2d');

  //   const simulation = d3.forceSimulation()
  //     .force('x', d3.forceX(width / 2))
  //     .force('y', d3.forceY(height / 2))
  //     .force('collide', d3.forceCollide(r + 5))
  //     .force('charge', d3.forceManyBody().strength(-700))
  //     .force('link', d3.forceLink()
  //       .id((d) => d['id']))
  //     .on('tick', update);

  //   simulation.nodes(graph.nodes);
  //   simulation.force<d3.ForceLink<any, any>>('link').links(graph.links);

  //   canvas
  //     .call(d3.drag()
  //       .container(canvas.node())
  //       .subject(dragsubject)
  //       .on('start', dragstarted)
  //       .on('drag', dragged)
  //       .on('end', dragended)
  //     );

  //   function update() {
  //     context.clearRect(0, 0, width, height);

  //     context.beginPath();
  //     graph.nodes.forEach(drawNode);
  //     context.fill();

  //     context.beginPath();
  //     graph.links.forEach(drawLink);
  //     context.stroke();
  //   }

  //   function dragsubject() {
  //     return simulation.find(d3.event.x, d3.event.y);
  //   }

  //   function dragstarted() {
  //     if (!d3.event.active) { simulation.alphaTarget(0.3).restart(); }
  //     d3.event.subject.fx = d3.event.subject.x;
  //     d3.event.subject.fy = d3.event.subject.y;
  //   }

  //   function dragged() {
  //     d3.event.subject.fx = d3.event.x;
  //     d3.event.subject.fy = d3.event.y;
  //   }

  //   function dragended() {
  //     if (!d3.event.active) { simulation.alphaTarget(0); }
  //     d3.event.subject.fx = null;
  //     d3.event.subject.fy = null;
  //   }

  //   function drawNode(d) {
  //     context.moveTo(d.x, d.y);
  //     context.drawImage('../../assets/switch.png')
  //   }

  //   function drawLink(l) {

  //     context.moveTo(l.source.x, l.source.y);
  //     context.lineTo(l.target.x, l.target.y);
  //   }

  //   update();
  // }
}
