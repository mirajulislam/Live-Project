/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Kh. Assaduzzaman Sohan
* Date          : 12 OCT 2020
* Description   : This script will update all missing tx_loan_tracking_id with updated 
					sequence of system key of id_loan_tracking_id_key.
*****************************************************************************************/

IF (EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES 
            WHERE TABLE_SCHEMA = 'dbo' 
            AND  TABLE_NAME = '#TEMP_LOAN_FOR_MISSING_TRACKING'))
BEGIN
    DROP TABLE #TEMP_LOAN_FOR_MISSING_TRACKING
END

IF (EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES 
            WHERE TABLE_SCHEMA = 'dbo' 
            AND  TABLE_NAME = '#TEMP_LOAN_FOR_MISSING_TRACKING_2'))
BEGIN
    DROP TABLE #TEMP_LOAN_FOR_MISSING_TRACKING_2
END

DECLARE @tracking_start INT = 
(
	SELECT  id_key_value
	FROM	T_SYSTEM_KEY
	WHERE	tx_key_name		= 'id_loan_tracking_id_key'
	AND		id_env_key		= 100000
)
, @tx_tracking_value VARCHAR(32) = ''

SELECT L.id_loan_key, L.id_loan_ver, L.tx_loan_tracking_id, L.dtt_mod, L.dtt_create
, @tracking_start AS tracking_start 
, @tx_tracking_value AS tx_tracking_value
, 0 AS tracking_value
INTO #TEMP_LOAN_FOR_MISSING_TRACKING
FROM T_LOAN L WITH(NOLOCK)
WHERE tx_loan_tracking_id in (null, '', '?')
ORDER BY id_loan_key ASC

SELECT *, ROW_NUMBER() OVER(ORDER BY id_loan_key ASC) as row_count
INTO #TEMP_LOAN_FOR_MISSING_TRACKING_2
FROM #TEMP_LOAN_FOR_MISSING_TRACKING

UPDATE #TEMP_LOAN_FOR_MISSING_TRACKING_2
SET tx_tracking_value = CONVERT(VARCHAR(32), tracking_start + row_count - 1)
, tracking_value = tracking_start + row_count - 1

UPDATE	T_SYSTEM_KEY WITH (ROWLOCK)
SET		id_key_value	= (SELECT MAX(tracking_value) + 1 FROM #TEMP_LOAN_FOR_MISSING_TRACKING_2)
WHERE	tx_key_name		= 'id_loan_tracking_id_key'
AND		id_env_key		= 100000

UPDATE T_LOAN
SET id_loan_ver = l.id_loan_ver + 1
, tx_loan_tracking_id = tl.tx_tracking_value
FROM T_LOAN l
JOIN #TEMP_LOAN_FOR_MISSING_TRACKING_2 tl on tl.id_loan_key = l.id_loan_key 


IF (EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES 
            WHERE TABLE_SCHEMA = 'dbo' 
            AND  TABLE_NAME = '#TEMP_LOAN_FOR_MISSING_TRACKING'))
BEGIN
    DROP TABLE #TEMP_LOAN_FOR_MISSING_TRACKING
END

IF (EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES 
            WHERE TABLE_SCHEMA = 'dbo' 
            AND  TABLE_NAME = '#TEMP_LOAN_FOR_MISSING_TRACKING_2'))
BEGIN
    DROP TABLE #TEMP_LOAN_FOR_MISSING_TRACKING_2
END

/*
	// verification select

	SELECT  id_key_value
	FROM	T_SYSTEM_KEY
	WHERE	tx_key_name		= 'id_loan_tracking_id_key'
	AND		id_env_key		= 100000
*/