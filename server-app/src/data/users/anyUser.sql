select count(id) as cnt from [dbo].[USERS]
where [NATIONAL_CODE] like @nationalCode
