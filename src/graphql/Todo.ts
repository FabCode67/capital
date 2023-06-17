import { booleanArg, extendType, intArg, nonNull, objectType, stringArg } from "nexus";
// import { NexusGenObjects } from "../../nexus-typegen"; 
export const Todo = objectType({
    name: "Todo", 
    definition(t) {  
        t.nonNull.int("id"); 
        t.nonNull.string("description"); 
        t.nonNull.boolean("checked"); 
    },
});

export const TodoQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("get", {
            type: "Todo",
            resolve(parent, args, context) {  
                return context.prisma.todo.findMany();  
            },
        });
    },
});

export const GetOnlyCtiveTodoQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("getOnlyActive", {
            type: "Todo",
            resolve(parent, args, context) {
                return context.prisma.todo.findMany({
                    where: {
                        checked: false,
                    },
                });
            },
        });
    },
});

export const GetOnlyCompletedTodoQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("getOnlyCompleted", {
            type: "Todo",
            resolve(parent, args, context) {
                return context.prisma.todo.findMany({
                    where: {
                        checked: true,
                    },
                });
            },
        });
    },
});


export const TodoMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("post", {
            type: "Todo",
            args: {
                description: nonNull(stringArg()),
            },
            resolve(parent, args, context) { 
                const newTodo = context.prisma.todo.create({   
                    data: {
                        description: args.description,
                    },
                });
                return newTodo;
            },
        });
    },
});

export const TodoDeleteMutation = extendType({
    type: "Mutation",
    definition(t) {
      t.nonNull.field("delete", {
        type: "Todo",
        args: {
          id: nonNull(intArg()),
        },
        resolve(parent, args, context) {
          return context.prisma.todo.delete({
            where: {
              id: args.id,
            },
          });
        },
      });
    },
  });
  
export  const ClearCompletedMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("clearCompleted", {
            type: "Todo",
            resolve(parent, args, context){
                return context.prisma.todo.deleteMany({
                    where: {
                        checked: true,
                    },
                })
            }
        })
    }
    })



  export const TodoUpdateMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("update", {
            type: "Todo",
            args: {
                id: nonNull(intArg()),
                description: nonNull(stringArg()),
                checked: nonNull(booleanArg())
            },
            resolve(parent, args, context){
                return context.prisma.todo.update({
                    where: {
                        id: args.id,
                    },
                    data: {
                        description: args.description,
                        checked: args.checked,
                    },
                })
            }
        })
    }
  })

  export const TodoUpdateCheckedMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("updateChecked", {
            type: "Todo",
            args: {
                id: nonNull(intArg()),
                checked: nonNull(booleanArg())
            },
            resolve(parent, args, context){
                return context.prisma.todo.update({
                    where: {
                        id: args.id,
                    },
                    data: {
                        checked: args.checked,
                    },
                })
            }
        })
    }
    })

    export const TodoUpdateDescriptionMutation = extendType({
        type: "Mutation",
        definition(t) {
            t.nonNull.field("updateDescription", {
                type: "Todo",
                args: {
                    id: nonNull(intArg()),
                    description: nonNull(stringArg()),
                },
                resolve(parent, args, context){
                    return context.prisma.todo.update({
                        where: {
                            id: args.id,
                        },
                        data: {
                            description: args.description,
                        },
                    })
                }
            })
        }
        })

        export const TodoGetSingleQuery = extendType({
            type: "Query",
            definition(t){
                t.field("getSingle", {
                    type: "Todo",
                    args: {
                        id: nonNull(intArg()),
                    },
                    resolve(parent, args, context){
                        return context.prisma.todo.findUnique({
                            where: {
                                id: args.id
                            }
                        })
                    }
                })
            }
        })