
INSERT INTO [dbo].[USERS]
           (
           [DOM_ID_GENDER]
           ,[DOM_ID_USER_TYPE]
           ,[NAME]
           ,[FAMILY]
           ,[NATIONAL_CODE]
           ,[PHONE]
           ,[MOBILE]
           ,[PASSWORD]
           ,[EMAIL]
           ,[ADDRESS]
           ,[START_DATE_TIME]
           ,[END_DATE_TIME]
           ,[IS_ACTIVE]
           ,[DESCRIPTION]
           ,[USE_ID_CREATOR]
           ,[CREATE_DATE_TIME]
           ,[MODIFY_USE_ID]
           ,[MODIFY_DATE_TIME]
           )
     VALUES
           (
           @domIdGender
           ,@domIdUserType
           ,@name
           ,@family
           ,@nationalCode
           ,@phone
           ,@mobile
           ,@password
           ,@email
           ,@address
           ,@startDateTime
           ,@endDateTime
           ,@isActive
           ,@description
           ,@useIdCreator
           ,@createDateTime
           ,@modifyUseId
           ,@modifyDateTime
           )
