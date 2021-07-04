

IF OBJECT_ID (N'dbo.calculateDateDiff', N'FN') IS NOT NULL  
    DROP FUNCTION calculateDateDiff;  
GO  
CREATE FUNCTION dbo.calculateDateDiff(@to_date DATETIME, @from_date DATETIME)  
RETURNS VARCHAR(256)   
AS    
BEGIN  
	IF (@from_date > @to_date)
	BEGIN
		DECLARE @l_date DATETIME = @to_date
		SET @to_date = @from_date
		SET @from_date = @l_date 
	END
	DECLARE
	   @year_to_date INT = YEAR(@to_date) 
	  ,@month_to_date INT = MONTH(@to_date) 
	  ,@date_to_date INT = DAY(@to_date)

	  ,@year_from_date INT = YEAR(@from_date) 
	  ,@month_from_date INT = MONTH(@from_date) 
	  ,@date_from_date INT = DAY(@from_date) 

	  ,@year_result INT
	  ,@month_result INT
	  ,@date_result INT;

	  SET @year_result = @year_to_date - @year_from_date;

	  IF (@month_to_date >= @month_from_date)
	  BEGIN
		SET @month_result = @month_to_date - @month_from_date;
	  END
	  ELSE 
	  BEGIN
		SET @year_result = @year_result - 1;
		SET @month_result = 12 + @month_to_date -@month_from_date;
	  END

	  IF (@date_to_date >= @date_from_date)
	  BEGIN
		SET @date_result = @date_to_date - @date_from_date;
	  END
	  ELSE 
	  BEGIN
		SET @month_result = @month_result - 1;
		SET @date_result = 31 + @date_to_date - @date_from_date;

		IF (@month_result < 0) 
		BEGIN
		  SET @month_result = 11;
		  SET @year_result = @year_result - 1;
		END
	  END
  
  RETURN CONVERT(varchar(10), @year_result)  + 'y, ' + CONVERT(varchar(10), @month_result) +'m';
END; 