import {v} from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateWorkspace = mutation({
    args:{
        massages:v.any(),
        user:v.id('users')
    },
    handler:async(ctx,args)=>{
        const workspaceId = await ctx.db.insert('workspace',{
            massages:args.massages,
            user:args.user
        })

            return workspaceId
    }
});

export const GetWorkspace = query({
    args:{
        workspaceId:v.id('workspace')
    },handler:async(ctx,args)=>{
        const workspace = await ctx.db.get(args.workspaceId);

        return workspace
    }
});

export const UpdateMassages = mutation({
    args:{
        workspaceId:v.id('workspace'),
        massages:v.any()
    },
    handler:async(ctx,args)=>{
        const result = await ctx.db.patch(args.workspaceId,{
            massages:args.massages
        })
        return result
    }
})

export const UpdateFile = mutation({
    args:{
        workspaceId:v.id('workspace'),
        fileData:v.any()
    },
    handler:async(ctx,args)=>{
        const result = await ctx.db.patch(args.workspaceId,{
            fileData:args.fileData
        })
        return result
    }
})

export const GetAllWorkspaces = query({
    args:{
        userId:v.id('users')
    },
    handler:async(ctx,args)=>{
        const result = await ctx.db.query('workspace')
        .filter(q=>q.eq(q.field('user'),args.userId)).collect();

        return result;
    }
})