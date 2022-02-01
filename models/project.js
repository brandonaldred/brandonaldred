const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema( {
    type: 'String',
    year: String,
    month: String,
    day: String,
    title: String,
    preview: String,
    body: String,
    image: String
});

const Project = mongoose.model( 'Project', ProjectSchema );

module.exports = Project;