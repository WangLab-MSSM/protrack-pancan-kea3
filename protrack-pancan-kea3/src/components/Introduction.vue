<template>
    <div class="introduction">

        <div class="protrack">
            ProTrack: <br>Pan-cancer KEA3
        </div>

        <div class="cptac-description">
            <p>This interactive data portal supports query, visualization, and download of kinase enrichment analysis (KEA3) scores across multiple cancer types, as part of a collaborative project by <a href="https://proteomics.cancer.gov/programs/cptac">Clinical Proteomic Tumor Analysis Consortium (CPTAC).</a></p>
            <p>Kinase Enrichment Analysis 3 (KEA3) infers upstream kinases whose putative substrates are overrepresented in a user-inputted list of proteins or differentially phosphorylated proteins. For more information on KEA3, visit the <a href="https://maayanlab.cloud/kea3/">Ma'ayan group's KEA3 page.</a></p>
            <p>NCI-supported CPTAC is a comprehensive and coordinated effort to accelerate the understanding of the molecular basis of cancer through the application of large-scale proteome (proteins) and genome (DNA and RNA) analysis technologies to different cancer types. Through collaboration with leaders in the field, CPTAC’s mission is to accelerate precision oncology through state-of-the-art proteogenomics and create open-source community resources.</p>
        </div>

    </div>
</template>

<script>
    export default {
        name: "introduction"
    }
</script>

<style scoped>
    .introduction {
        background: #91818a;
        padding: 2em;
        color: white;
        display: flex;
    }

    .protrack {
        font-weight: bold;
        font-size: 1.5em;
        margin-right: 1em;
        min-width: 20%;
        max-width: 20%;
        text-align: right;
    }

    .cptac-description {
        font-size: 0.85em;
        min-width: 70%;
        max-width: 70%;
    }

    .cptac-description a {
        color: white;
        font-weight: bold;
        text-decoration: underline;
    }
</style>