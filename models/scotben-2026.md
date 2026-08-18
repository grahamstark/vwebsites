---
title: Scotben Mini 2026
author: graham_s
layout: scotben-2026
permalink: /scotben-2026/
order: 1
category: Scotland
whichapi: http://microapi-local/
---

This is a simple front-end to [ScotBen](https://github.com/grahamstark/ScottishTaxBenefitModel.jl){:target="_blank"} , a microsimulation tax-benefit model of Scotland. You can change taxes and benefits and see how that would affect the people of Scotland. Only a few key parameters are for the main taxes and benefits are here, but the model itself is capable of much more. 

A tax benefit model is a  a computer program that calculates the effects of possible changes to the fiscal system on a sample of households. It uses [Family Resources Survey](https://www.gov.uk/government/collections/family-resources-survey--2) data, a dataset that records the incomes and family circumstances of a large sample of households. 
We take each of the households in the dataset,  calculate how much tax the household members are liable for under some proposed tax and benefit regime, and how much benefits they are entitled to, and add add up the results. If the sample is representative of the population, and the modelling sufficiently accurate, the model can then tell you, for example, the net costs of the proposals, the numbers who are made better or worse off, the effective tax rates faced by individuals, the numbers taken in and out of poverty by some change, and much else.

Scotben is a conventionally structured static microsimulation tax-benefit model, in the family of models branching out from the [Institute for Fiscal Studies’ TAXBEN](https://ifs.org.uk/publications/taxben-ifs-tax-and-benefit-microsimulation-model){:target="_blank"}, of which I was one of the principal authors. Scotben has been used in several projects at the University of Northumbria and elsewhere. 

Scotben is [Open Source](https://en.wikipedia.org/wiki/Open_source), so anyone can inspect the code. It's written in the [Julia programming language](https://julialang.org/){:target="_blank"}. This web interface built with [Jekyll](https://jekyllrb.com/docs/installation/){:target="_blank"}.

More about Scotben: 

* [A brief introduction to Scotben](https://stb-blog.virtual-worlds.scot/assets/scotben-summary-note.pdf){:target="_blank"};
* [Scotben Peer Review by University of Essex](https://stb-blog.virtual-worlds.scot/assets/scotben-essex-review.pdf){:target="_blank"} ;
* [The blog I keep while building the model](https://stb-blog.virtual-worlds.scot/){:target="_blank"} ;
* [A recent report](https://www.futureeconomy.scot/publications/297-funding-scotland-s-future-tax-reform-for-a-new-parliament){:target="_blank"} by [Future Economy Scotland](https://www.futureeconomy.scot/){:target="_blank"}  that uses ScotBen;
* [TriplePC](https://conjoint.virtual-worlds.scot/){:target="_blank"}  a project from the University of Northumbria that uses Scotben code (but models the whole of the UK). 
* [Presentation at the JuliaCon - the Julia developer's conference](https://pretalx.com/juliacon-2022/talk/KPRZAM/){:target="_blank"};
* [Presentation at Internatiional Microsimulation Association Conference](https://stb-blog.virtual-worlds.scot/articles/2022/01/01/IMA.html){:target="_blank"} ;
* [TriplePC Paper](https://microsimulation.pub/articles/00323){:target="_blank"} .

The model is fully open source (with the exception of the survey datasets themselves, which I'm not permitted to release):

* [The Model Source Code](https://github.com/grahamstark/ScottishTaxBenefitModel.jl){:target="_blank"};
* Other packages I've built for this project:
  - [The templates for this web page](https://github.com/grahamstark/vwebsites){:target="_blank"};
  - [The 'API' code that connects this web front-end to the model itself](https://github.com/grahamstark/MicrosimAPIv1){:target="_blank"};
  - [The code for building the graphs and tables](https://github.com/grahamstark/MicroVisualisations.jl){:target="_blank"} - this is kept seperately from the model itself;
  - [Generate measures of poverty and inequality](https://github.com/grahamstark/PovertyAndInequalityMeasures.jl){:target="_blank"};
  - [Reweight the survey data we use to accurately match the population of Scotland](https://github.com/grahamstark/SurveyDataWeighting.jl){:target="_blank"};
  - [Generate Budget Constraints](https://github.com/grahamstark/BudgetConstraints.jl){:target="_blank"}.
