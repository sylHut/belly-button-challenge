// Use the D3 library to read in samples.json from the URL provided
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
function init() {
    d3.json(url).then(function(data){
        console.log(data);
        const names=data.names
        let dropdown = d3.select("#selDataset")
        for (let i = 0; i<names.length; i++){
            dropdown.append("option").text(names[i]).property("value", names[i])
        }
        // buildcharts(names[0])
        optionChanged (names[0])
    })
}

init()

// Create a horizontal bar chart 
function optionChanged (sample_id){
    buildcharts(sample_id)
    buildMetadata(sample_id)
}
function buildcharts(sample_id)
{
    d3.json(url).then(function(data)
    {
        const samples=data.samples
        const sample=samples.filter(element => element.id == sample_id)[0]
        console.log(sample)  

        // Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual
        let otu_ids = sample.otu_ids
        let otu_labels = sample.otu_labels
        let sample_values = sample.sample_values

        let bartrace = [{
            x: sample_values.slice(0,10).reverse(),
            y: otu_ids.slice(0,10).map(otu_id => "OTU " + otu_id).reverse(),
            text: otu_labels.slice(0,10).reverse(),
            type:'bar',
            orientation: 'h'
        }]
        
        // let barlayout = {
        //     width: 400,
        //     height: 800,
        //     margin: {
        //         l: 200,
        //         r: 100,
        //         b: -100,
        //         t: -100
        //     }  
        // }

        Plotly.newPlot("bar", bartrace, {})
        

        // Create a bubble chart that displays each sample

        let bubbletrace = [{
            x: otu_ids,
            y: sample_values,
            mode: "markers",
            marker: {
                color: otu_ids,
                size: sample_values,
                colorscale: "Earth"
            },
            text: otu_labels, 
        }]

        Plotly.newPlot("bubble", bubbletrace, {})

})}
        // Display the sample metadata

    function buildMetadata (metainfo){
        d3.json(url).then(function(data){
            const meta = data.metadata
            const metas = meta.filter(element => element.id == metainfo)
            console.log(metas)

        let firstMeta = metas[0]
        console.log(firstMeta)
        let demoInfo = d3.select("#sample-metadata")
        demoInfo.html("")
        Object.entries(firstMeta).forEach(([key, value])=>{
            demoInfo.append('p').text(`${key}:${value}`)
        })    
    }
        )}

        // var sampleMetadata = {
        //     id: 940,
        //     ethnicity: 'Caucasian',
        //     gender: 'F',
        //     age: 24,
        //     location: 'Beaufort/NC',
        //     bbtype: 'i',
        //     wfreq: 2
        //     };
            


// Display the sample metadata


// Display each key-value pair from the metadata JSON object somewhere on the page


// Update all the plots when a new sample is selected


// Deploy your app to a free static page hosting service, such as GitHub Pages. 
// Submit the links to your deployment and your GitHub repo. 
// Ensure that your repository has regular commits and a thorough README.md file