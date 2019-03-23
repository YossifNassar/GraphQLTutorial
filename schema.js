const {GraphQLSchema,GraphQLObjectType, GraphQLInt, GraphQLFloat, GraphQLString, GraphQLList} = require('graphql')

const PersonType = new GraphQLObjectType({
    name: 'Person',
    fields: () => ({
        id: {type: GraphQLInt},
        name: {type: GraphQLString},
        age: {type: GraphQLFloat},
        courses: {type: GraphQLList(CourseType)}
    })
})

const CourseType = new GraphQLObjectType({
    name: 'Course',
    fields: () => ({
        name: {type: GraphQLString},
        mark: {type: GraphQLFloat},
        semester: {type: GraphQLString}
    })
})

var people =  {
    1: {id: 1, name: "Yossef", age: 26.7, courses: [{name: 'Algebra A', mark: 94, semester: 'Spring'}]},
    2: {id:2, name: "fayez", age: 288.4}
}

//Root query
const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: () => ({
        persons: {
            type: new GraphQLList(PersonType),
            resolve(parent, args) {
                return Object.keys(people).map(key => people[key])
            }
        },
        person: {
            type: PersonType,
            args: {
                id: {type: GraphQLInt}
            }, 
            resolve(parent,args) {
                return people[args.id]
            }
        }
    })
})

module.exports = new GraphQLSchema({
    query: RootQuery
})