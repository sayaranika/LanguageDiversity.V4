import React from "react";
import * as d3 from "d3";

export default class MapTreeCombined {
  constructor(_config, DAData, cityData, treeData) {
    this.config = {
      mapParentElement: _config.mapParentElement,
      treeParentElement: _config.treeParentElement,

      mapHeight: _config.mapHeight || 500,
      mapWidth: _config.mapWidth || 500,
      treeHeight: _config.treeHeight || 500,
      treeWidth: _config.treeWidth || 1500,

      mapMargin: { top: 10, bottom: 10, right: 10, left: 10 },
      treeMargin: { top: 10, bottom: 10, right: 10, left: 125 },

      mapLegendWidth: 5,
      mapLegendHeight: 50,
    };

    this.config.dx = 25;
    this.config.dy = this.config.treeWidth / 7.5;

    this.DAData = DAData;
    this.cityData = cityData;
    this.root = d3.hierarchy(treeData);
    this.rootCopy = this.root.copy();
    this.root.x0 = this.config.dy / 2;
    this.root.y0 = 0;

    this.root.descendants().forEach((d, i) => {
      d.id = i;
    });

    console.log("done");

    /* this.root.each((node) => {
      if (!node.children) {
        node.numSpeakers = d3.sum(
          this.cityData.features,
          (d) => d.properties[node.data.name]
        );
      }
    });

    this.root.eachAfter((node) => {
      if (node.children) {
        node.numSpeakers = d3.sum(node.children, (d) => d.numSpeakers);
      }
    });

    this.root.each((d) => {
      if (d.children) {
        const kept_children = [];
        for (let child of d.children) {
          if (child.numSpeakers !== 0) {
            kept_children.push(child);
          }
        }
        d.children = kept_children;
      }
    });

    this.root.descendants().forEach((d, i) => {
      d._children = d.children;
    }); */

    this.initVis();
  }

  initVis() {
    let vis = this;

    vis.mapSVG = d3
      .select(vis.config.mapParentElement)
      .attr("width", vis.config.mapWidth)
      .attr("height", vis.config.mapHeight);
    //.on("click", reset);

    vis.mapChart = vis.mapSVG.append("g");

    vis.treeChart = d3
      .select(vis.config.treeParentElement)
      .attr("width", vis.config.treeWidth)
      .attr("height", vis.config.treeHeight)
      .attr("viewBox", [
        -vis.config.treeMargin.left,
        -vis.config.treeMargin.top,
        vis.config.treeWidth,
        vis.config.dx,
      ]);

    vis.tree = d3.tree().nodeSize([vis.config.dx, vis.config.dy]);
    vis.diagonal = d3
      .linkHorizontal()
      .x((d) => d.y)
      .y((d) => d.x);

    //accessor
    vis.ldiAccessor = (d) => +d.properties["LDI"];

    vis.projection = d3
      .geoMercator()
      .fitSize([vis.config.mapWidth, vis.config.mapHeight], vis.DAData);

    vis.pathGenerator = d3.geoPath(vis.projection);

    //preprocess data

    console.log("done");
  }
}
