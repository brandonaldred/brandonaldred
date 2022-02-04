const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema( {
    type: 'String',
    datePosted: {
        type: Date,
        default: new Date()
    },
    image: String,
    title: String,
    preview: String,
    body: String,
    link: String
});

const Project = mongoose.model( 'Project', ProjectSchema );

module.exports = Project;