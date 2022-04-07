
INSERT INTO [dbo].[DOMANS]
           ([DOM_ID]
           ,[CODE]
           ,[NAME]
           ,[TITLE]
           ,[IS_ACTIVE]
           ,[ORDERING])
     VALUES
           (
           @domId
           ,@code
           ,@name
           ,@title
           ,@isActive
           ,@ordering
           );

SELECT SCOPE_IDENTITY() AS id;
