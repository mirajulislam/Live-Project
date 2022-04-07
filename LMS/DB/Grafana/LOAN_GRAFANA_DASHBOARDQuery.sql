------------------ Todays Loan ---------------





SELECT *
, X.Requested - X.Approved - X.Declined AS 'On Process' 
FROM
(
	SELECT
	(
		SELECT COUNT(1) FROM T_LOAN WITH(NOLOCK)
		WHERE is_active = 1 and convert(varchar, dtt_create, 23)  =  convert(varchar, getdate(), 23)
	) AS Requested
	,(
		SELECT COUNT(1) FROM T_LOAN L WITH(NOLOCK)
		JOIN T_FSM_STATE S WITH(NOLOCK) ON L.id_state_key = S.id_fsm_state_key
		JOIN T_FSM_TYPE T WITH(NOLOCK) ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
		WHERE L.is_active = 1 
		AND (S.tx_state_name LIKE '%APPROVED' or S.tx_state_name IN('SENT_TO_CAD', 'SL_GENERATED', 'DISBURSED'))
		AND S.tx_state_name NOT LIKE '%_C_APPROVED' and  convert(varchar, dtt_create, 23)  =  convert(varchar, getdate(), 23)
	) AS Approved
	,(
		SELECT COUNT(1) FROM T_LOAN L WITH(NOLOCK)
		JOIN T_FSM_STATE S WITH(NOLOCK) ON L.id_state_key = S.id_fsm_state_key
		JOIN T_FSM_TYPE T WITH(NOLOCK) ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
		WHERE L.is_active = 1
		AND S.tx_state_name LIKE '%DECLINED' and convert(varchar, dtt_create, 23)  =  convert(varchar, getdate(), 23)
	 ) AS Declined ,  DATEADD(DAY, 0, CONVERT(date, GETDATE())) as time
 ) AS X


--------------------- Yesterday's Loan --------------------------






SELECT *
, X.Requested - X.Approved - X.Declined AS 'On Process' 
FROM
(
	SELECT
	(
		SELECT COUNT(1) FROM T_LOAN WITH(NOLOCK)
		WHERE is_active = 1 and  dtt_create between   cast(dateadd(day,datediff(day,1,GETDATE()),0) as date) and  cast(dateadd(day,datediff(day,1,GETDATE()),0) as date)

	) AS Requested
	,(
		SELECT COUNT(1) FROM T_LOAN L WITH(NOLOCK)
		JOIN T_FSM_STATE S WITH(NOLOCK) ON L.id_state_key = S.id_fsm_state_key
		JOIN T_FSM_TYPE T WITH(NOLOCK) ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
		WHERE L.is_active = 1 
		AND (S.tx_state_name LIKE '%APPROVED' or S.tx_state_name IN('SENT_TO_CAD', 'SL_GENERATED', 'DISBURSED'))
		AND S.tx_state_name NOT LIKE '%_C_APPROVED' and dtt_create between   cast(dateadd(day,datediff(day,1,GETDATE()),0) as date) and  cast(dateadd(day,datediff(day,1,GETDATE()),0) as date)

	) AS Approved
	,(
		SELECT COUNT(1) FROM T_LOAN L WITH(NOLOCK)
		JOIN T_FSM_STATE S WITH(NOLOCK) ON L.id_state_key = S.id_fsm_state_key
		JOIN T_FSM_TYPE T WITH(NOLOCK) ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
		WHERE L.is_active = 1
		AND S.tx_state_name LIKE '%DECLINED' and  dtt_create between   cast(dateadd(day,datediff(day,1,GETDATE()),0) as date) and  cast(dateadd(day,datediff(day,1,GETDATE()),0) as date)
	 ) AS Declined ,  DATEADD(DAY, 0, CONVERT(date, GETDATE())) as time
 ) AS X



-----------------------   Total Loans To Date --------------------------

SELECT *
, X.Requested - X.Approved - X.Declined AS 'On Process' 
FROM
(
	SELECT
	(
		SELECT COUNT(1) FROM T_LOAN WITH(NOLOCK)
		WHERE is_active = 1
	) AS Requested
	,(
		SELECT COUNT(1) FROM T_LOAN L WITH(NOLOCK)
		JOIN T_FSM_STATE S WITH(NOLOCK) ON L.id_state_key = S.id_fsm_state_key
		JOIN T_FSM_TYPE T WITH(NOLOCK) ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
		WHERE L.is_active = 1 
		AND (S.tx_state_name LIKE '%APPROVED' or S.tx_state_name IN('SENT_TO_CAD', 'SL_GENERATED', 'DISBURSED'))
		AND S.tx_state_name NOT LIKE '%_C_APPROVED'
	) AS Approved
	,(
		SELECT COUNT(1) FROM T_LOAN L WITH(NOLOCK)
		JOIN T_FSM_STATE S WITH(NOLOCK) ON L.id_state_key = S.id_fsm_state_key
		JOIN T_FSM_TYPE T WITH(NOLOCK) ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
		WHERE L.is_active = 1
		AND S.tx_state_name LIKE '%DECLINED'
	 ) AS Declined ,DATEADD(DAY, -60, CONVERT(date, GETDATE())) as time
 ) AS X


------------ Approved Amount -----------

DROP TABLE IF EXISTS #TEMP_LAST_1_MONTH_APPROVED_LOAN
DROP TABLE IF EXISTS #TEMP_LAST_3_MONTH_APPROVED_LOAN
DROP TABLE IF EXISTS #TEMP_LAST_2_MONTH_APPROVED_LOAN
SELECT DISTINCT L.id_loan_key
INTO #TEMP_LAST_3_MONTH_APPROVED_LOAN
FROM T_LOAN_AUDIT L WITH(NOLOCK)
JOIN T_FSM_STATE S WITH(NOLOCK) ON L.id_state_key = S.id_fsm_state_key
JOIN T_FSM_TYPE T WITH(NOLOCK) ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
WHERE L.is_active = 1
AND (S.tx_state_name LIKE '%APPROVED' or S.tx_state_name IN('SENT_TO_CAD', 'SL_GENERATED', 'DISBURSED'))
AND S.tx_state_name NOT LIKE '%_C_APPROVED'
AND L.dtt_mod >= DATEADD(DAY, -90, CONVERT(date, GETDATE()))
GROUP BY L.id_loan_key

SELECT DISTINCT L.id_loan_key
INTO #TEMP_LAST_2_MONTH_APPROVED_LOAN
FROM T_LOAN_AUDIT L WITH(NOLOCK)
JOIN T_FSM_STATE S WITH(NOLOCK) ON L.id_state_key = S.id_fsm_state_key
JOIN T_FSM_TYPE T WITH(NOLOCK) ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
WHERE L.is_active = 1
AND (S.tx_state_name LIKE '%APPROVED' or S.tx_state_name IN('SENT_TO_CAD', 'SL_GENERATED', 'DISBURSED'))
AND S.tx_state_name NOT LIKE '%_C_APPROVED'
AND L.dtt_mod >= DATEADD(DAY, -60, CONVERT(date, GETDATE()))
GROUP BY L.id_loan_key

SELECT DISTINCT L.id_loan_key
INTO #TEMP_LAST_1_MONTH_APPROVED_LOAN
FROM T_LOAN_AUDIT L WITH(NOLOCK)
JOIN T_FSM_STATE S WITH(NOLOCK) ON L.id_state_key = S.id_fsm_state_key
JOIN T_FSM_TYPE T WITH(NOLOCK) ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
WHERE L.is_active = 1
AND (S.tx_state_name LIKE '%APPROVED' or S.tx_state_name IN('SENT_TO_CAD', 'SL_GENERATED', 'DISBURSED'))
AND S.tx_state_name NOT LIKE '%_C_APPROVED'
AND L.dtt_mod >= DATEADD(DAY, -30, CONVERT(date, GETDATE()))
GROUP BY L.id_loan_key


SELECT
(
	SELECT  SUM(L.dec_recommended_for_approval)
	FROM #TEMP_LAST_3_MONTH_APPROVED_LOAN AL WITH(NOLOCK)
	JOIN T_LOAN L WITH(NOLOCK) ON L.id_loan_key = AL.id_loan_key
) AS 'Last 3 Month',
(
	SELECT  SUM(L.dec_recommended_for_approval)
	FROM #TEMP_LAST_2_MONTH_APPROVED_LOAN AL WITH(NOLOCK)
	JOIN T_LOAN L WITH(NOLOCK) ON L.id_loan_key = AL.id_loan_key
) AS 'Last 2 Month',
(
	SELECT SUM(L.dec_recommended_for_approval) 
	FROM #TEMP_LAST_1_MONTH_APPROVED_LOAN AL WITH(NOLOCK)
	JOIN T_LOAN L WITH(NOLOCK) ON L.id_loan_key = AL.id_loan_key
) AS 'Last 1 Month', DATEADD(DAY, -30, CONVERT(date, GETDATE())) as time


-------------- Loan Status ---------

DECLARE @l_action_name varchar(32) = '${PieChartSelection:csv}' --- QUARTALY, YEARLY

, @l_year varchar(4) = '2021'

IF(@l_action_name = 'Monthly' OR @l_action_name = 'Quarterly')
BEGIN
	DECLARE @l_value INT = 30
	IF(@l_action_name = 'Quarterly')
	BEGIN
		SET @l_value = 90
	END
	DECLARE @l_dtt_create DATE = (SELECT DATEADD(DAY, -@l_value, CONVERT(date, GETDATE())))
	SELECT X.*
	, X.Requested - X.Approved - X.Declined AS 'On Process', DATEADD(DAY, -30, CONVERT(date, GETDATE())) as time  
	FROM
	(
		SELECT
		(
			SELECT COUNT(1) FROM T_LOAN WITH(NOLOCK)
			WHERE is_active = 1
			AND dtt_create >= @l_dtt_create
		) AS Requested
		,(
			SELECT COUNT(1) FROM T_LOAN L WITH(NOLOCK)
			JOIN T_FSM_STATE S WITH(NOLOCK) ON L.id_state_key = S.id_fsm_state_key
			JOIN T_FSM_TYPE T WITH(NOLOCK) ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
			WHERE L.is_active = 1 
			AND (S.tx_state_name LIKE '%APPROVED' or S.tx_state_name IN('SENT_TO_CAD', 'SL_GENERATED', 'DISBURSED'))
			AND S.tx_state_name NOT LIKE '%_C_APPROVED'
			AND dtt_create >= @l_dtt_create
		) AS Approved
		,(
			SELECT COUNT(1) FROM T_LOAN L WITH(NOLOCK)
			JOIN T_FSM_STATE S WITH(NOLOCK) ON L.id_state_key = S.id_fsm_state_key
			JOIN T_FSM_TYPE T WITH(NOLOCK) ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
			WHERE L.is_active = 1
			AND S.tx_state_name LIKE '%DECLINED'
			AND dtt_create >= @l_dtt_create
		) AS Declined
	) AS X
END
IF(@l_action_name LIKE 'YEARLY-%')
BEGIN
	SET @l_year = RIGHT(@l_action_name, 4)
	SELECT X.*
	, X.Requested - X.Approved - X.Declined AS 'On Process',DATEADD(DAY, -30, CONVERT(date, GETDATE())) as time  
	FROM
	(
		SELECT
		(
			SELECT COUNT(1) FROM T_LOAN WITH(NOLOCK)
			WHERE is_active = 1
			AND DATENAME(year, dtt_create) = @l_year
		) AS Requested
		,(
			SELECT COUNT(1) FROM T_LOAN L WITH(NOLOCK)
			JOIN T_FSM_STATE S WITH(NOLOCK) ON L.id_state_key = S.id_fsm_state_key
			JOIN T_FSM_TYPE T WITH(NOLOCK) ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
			WHERE L.is_active = 1 
			AND (S.tx_state_name LIKE '%APPROVED' or S.tx_state_name IN('SENT_TO_CAD', 'SL_GENERATED', 'DISBURSED'))
			AND S.tx_state_name NOT LIKE '%_C_APPROVED'
			AND DATENAME(year, dtt_create) = @l_year
		) AS Approved
		,(
			SELECT COUNT(1) FROM T_LOAN L WITH(NOLOCK)
			JOIN T_FSM_STATE S WITH(NOLOCK) ON L.id_state_key = S.id_fsm_state_key
			JOIN T_FSM_TYPE T WITH(NOLOCK) ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
			WHERE L.is_active = 1
			AND S.tx_state_name LIKE '%DECLINED'
			AND DATENAME(year, dtt_create) = @l_year
		) AS Declined
	) AS X
END



--------------- Department -----------


DECLARE @l_action_name varchar(32) = '${PieChartSelection:csv}' --- QUARTALY, YEARLY
, @l_year varchar(4) = '2021'

IF(@l_action_name = 'Monthly' OR @l_action_name = 'Quarterly')
BEGIN
	DECLARE @l_value INT = 30
	IF(@l_action_name = 'Quarterly')
	BEGIN
		SET @l_value = 90
	END
	DECLARE @l_dtt_create DATE = (SELECT DATEADD(DAY, -@l_value, CONVERT(date, GETDATE())))
	SELECT 
	(
		SELECT COUNT(1) FROM
		(
			SELECT  L.id_loan_key, A.tx_action_name
			FROM T_LOAN_AUDIT L WITH(NOLOCK)
			JOIN T_FSM_ACTION A WITH(NOLOCK) ON A.id_fsm_action_key = L.id_action_key
			WHERE L.is_active = 1
			AND A.tx_action_name = 'FO_SUBMIT'
			AND L.dtt_mod >= @l_dtt_create
			GROUP BY L.id_loan_key, A.tx_action_name
		) AS X
	) AS 'ADC(FO)',
	(
		SELECT COUNT(1) FROM
		(
			SELECT  L.id_loan_key, A.tx_action_name
			FROM T_LOAN_AUDIT L WITH(NOLOCK)
			JOIN T_FSM_ACTION A WITH(NOLOCK) ON A.id_fsm_action_key = L.id_action_key
			WHERE L.is_active = 1
			AND A.tx_action_name = 'SO_RECOMMEND'
			AND L.dtt_mod >= @l_dtt_create
			GROUP BY L.id_loan_key, A.tx_action_name
		) AS X
	) AS 'PPC(SO)',
	(
		SELECT COUNT(1) FROM
		(
			SELECT  L.id_loan_key, A.tx_action_name
			FROM T_LOAN_AUDIT L WITH(NOLOCK)
			JOIN T_FSM_ACTION A WITH(NOLOCK) ON A.id_fsm_action_key = L.id_action_key
			WHERE L.is_active = 1
			AND A.tx_action_name IN( 'RM_APPROVE', 'UH_APPROVE', 'HOCRM_APPROVE', 'MD_APPROVE', 'CEO_APPROVE')
			AND L.dtt_mod >= @l_dtt_create
			GROUP BY L.id_loan_key, A.tx_action_name
		) AS X
	) AS CRM,
	(
		SELECT COUNT(1) FROM
		(
			SELECT  L.id_loan_key, A.tx_action_name
			FROM T_LOAN_AUDIT L WITH(NOLOCK)
			JOIN T_FSM_ACTION A WITH(NOLOCK) ON A.id_fsm_action_key = L.id_action_key
			WHERE L.is_active = 1
			AND A.tx_action_name IN ('GENERATE_SL', 'DISBURSE')
			AND L.dtt_mod >= @l_dtt_create
			GROUP BY L.id_loan_key, A.tx_action_name
		) AS X
	) AS CAD,DATEADD(DAY, -30, CONVERT(date, GETDATE())) as time
END
IF(@l_action_name LIKE 'YEARLY-%')
BEGIN
	SET @l_year = RIGHT(@l_action_name, 4) 
	SELECT 
	(
		SELECT COUNT(1) FROM
		(
			SELECT  L.id_loan_key, A.tx_action_name
			FROM T_LOAN_AUDIT L WITH(NOLOCK)
			JOIN T_FSM_ACTION A WITH(NOLOCK) ON A.id_fsm_action_key = L.id_action_key
			WHERE L.is_active = 1
			AND A.tx_action_name = 'FO_SUBMIT'
			AND DATENAME(year, L.dtt_mod) = @l_year
			GROUP BY L.id_loan_key, A.tx_action_name
		) AS X
	) AS 'ADC(FO)',
	(
		SELECT COUNT(1) FROM
		(
			SELECT  L.id_loan_key, A.tx_action_name
			FROM T_LOAN_AUDIT L WITH(NOLOCK)
			JOIN T_FSM_ACTION A WITH(NOLOCK) ON A.id_fsm_action_key = L.id_action_key
			WHERE L.is_active = 1
			AND A.tx_action_name = 'SO_RECOMMEND'
			AND DATENAME(year, L.dtt_mod) = @l_year
			GROUP BY L.id_loan_key, A.tx_action_name
		) AS X
	) AS 'PPC(SO)',
	(
		SELECT COUNT(1) FROM
		(
			SELECT  L.id_loan_key, A.tx_action_name
			FROM T_LOAN_AUDIT L WITH(NOLOCK)
			JOIN T_FSM_ACTION A WITH(NOLOCK) ON A.id_fsm_action_key = L.id_action_key
			WHERE L.is_active = 1
			AND A.tx_action_name IN( 'RM_APPROVE', 'UH_APPROVE', 'HOCRM_APPROVE', 'MD_APPROVE', 'CEO_APPROVE')
			AND DATENAME(year, L.dtt_mod) = @l_year
			GROUP BY L.id_loan_key, A.tx_action_name
		) AS X
	) AS CRM,
	(
		SELECT COUNT(1) FROM
		(
			SELECT  L.id_loan_key, A.tx_action_name
			FROM T_LOAN_AUDIT L WITH(NOLOCK)
			JOIN T_FSM_ACTION A WITH(NOLOCK) ON A.id_fsm_action_key = L.id_action_key
			WHERE L.is_active = 1
			AND A.tx_action_name IN ('GENERATE_SL', 'DISBURSE')
			AND DATENAME(year, L.dtt_mod) = @l_year
			GROUP BY L.id_loan_key, A.tx_action_name
		) AS X
	) AS CAD,DATEADD(DAY, -30, CONVERT(date, GETDATE())) as time
END


------------ Last 7 Days Requests ------------

DROP TABLE IF EXISTS #TMP_DATE
DROP TABLE IF EXISTS #TEMP_COUNT
DROP TABLE IF EXISTS #TEMP_COUNT_WEB
DROP TABLE IF EXISTS #TEMP_COUNT_MOBILE
CREATE TABLE #TMP_DATE (
dt_date DATE
, int_count INT
, int_count_web INT
, int_count_mobile INT
)
INSERT INTO #TMP_DATE(dt_date,int_count,int_count_web,int_count_mobile) VALUES(GETDATE(), 0, 0,0)
DECLARE @l_counter INT = 1
WHILE ( @l_counter < 7)
BEGIN
INSERT INTO #TMP_DATE(dt_date,int_count,int_count_web,int_count_mobile) VALUES(DATEADD(day,-1 * @l_counter, GETDATE()), 0,0,0)
SET @l_counter = @l_counter + 1
END

SELECT TOP(7) CAST(dtt_create AS DATE) AS dt_create , COUNT(1) AS int_count
INTO #TEMP_COUNT
FROM T_LOAN L WITH(NOLOCK)
WHERE is_active = 1
GROUP BY CAST(dtt_create AS DATE)
ORDER BY CAST(dtt_create AS DATE) DESC


SELECT TOP(7) CAST(dtt_create AS DATE) AS dt_create , COUNT(1) as web_count
INTO #TEMP_COUNT_WEB
FROM T_LOAN L WITH(NOLOCK)
WHERE is_active = 1 and tx_data_source= 'WEB'
GROUP BY CAST(dtt_create AS DATE)
ORDER BY CAST(dtt_create AS DATE) DESC

SELECT TOP(7) CAST(dtt_create AS DATE) AS dt_create , COUNT(1) as mobile_count
INTO #TEMP_COUNT_MOBILE
FROM T_LOAN L WITH(NOLOCK)
WHERE is_active = 1 and tx_data_source= 'MOBILE'
GROUP BY CAST(dtt_create AS DATE)
ORDER BY CAST(dtt_create AS DATE) DESC


UPDATE T
SET int_count = C.int_count, int_count_web=W.web_count,int_count_mobile=M.mobile_count
FROM #TMP_DATE T
JOIN #TEMP_COUNT C ON C.dt_create = T.dt_date
JOIN #TEMP_COUNT_WEB W ON W.dt_create = T.dt_date
JOIN #TEMP_COUNT_MOBILE M ON M.dt_create = T.dt_date


-- SELECT CONVERT(varchar, dt_date, 23) + '(' + LEFT(DATENAME(weekday,dt_date), 3) + ')' as 'Requested Date',int_count as Requests FROM #TMP_DATE

SELECT dt_date as time
, Requests = int_count ,WEB= int_count_web,ELON=int_count_mobile
FROM #TMP_DATE
order by dt_date desc



------------- Current Months Activity ----------


DECLARE @l_start_of_month DATE = (SELECT CONVERT(date, DATEADD(MONTH, DATEDIFF(MONTH, 0, GETDATE()), 0)))
SELECT 
(
	SELECT COUNT(1) FROM
	(
		SELECT  L.id_loan_key, A.tx_action_name
		FROM T_LOAN_AUDIT L WITH(NOLOCK)
		JOIN T_FSM_ACTION A WITH(NOLOCK) ON A.id_fsm_action_key = L.id_action_key
		WHERE L.is_active = 1
		AND A.tx_action_name = 'FO_SUBMIT'
		AND L.tx_data_source = 'WEB'
		AND L.dtt_mod >= @l_start_of_month
		GROUP BY L.id_loan_key, A.tx_action_name
	) AS X
) AS 'Submitted(Web)',
(
	SELECT COUNT(1) FROM
	(
		SELECT  L.id_loan_key, A.tx_action_name
		FROM T_LOAN_AUDIT L WITH(NOLOCK)
		JOIN T_FSM_ACTION A WITH(NOLOCK) ON A.id_fsm_action_key = L.id_action_key
		WHERE L.is_active = 1
		AND A.tx_action_name = 'FO_SUBMIT'
		AND L.tx_data_source = 'MOBILE'
		AND L.dtt_mod >= @l_start_of_month
		GROUP BY L.id_loan_key, A.tx_action_name
	) AS X
) AS 'Submitted(ELoan)',
(
	SELECT COUNT(1) FROM
	(
		SELECT  L.id_loan_key, A.tx_action_name
		FROM T_LOAN_AUDIT L WITH(NOLOCK)
		JOIN T_FSM_ACTION A WITH(NOLOCK) ON A.id_fsm_action_key = L.id_action_key
		WHERE L.is_active = 1
		AND A.tx_action_name = 'PPC_RECOMMEND'
		AND L.dtt_mod >= @l_start_of_month
		GROUP BY L.id_loan_key, A.tx_action_name
	) AS X
) AS 'Recommended(PPC)',
(
	SELECT COUNT(1) FROM
	(
		SELECT  L.id_loan_key, A.tx_action_name
		FROM T_LOAN_AUDIT L WITH(NOLOCK)
		JOIN T_FSM_ACTION A WITH(NOLOCK) ON A.id_fsm_action_key = L.id_action_key
		WHERE L.is_active = 1
		AND A.tx_action_name IN( 'RM_APPROVE', 'UH_APPROVE', 'HOCRM_APPROVE')
		AND L.dtt_mod >= @l_start_of_month
		GROUP BY L.id_loan_key, A.tx_action_name
	) AS X
) AS 'Endorsed(CRM)',
(
	SELECT COUNT(1) FROM
	(
		SELECT  L.id_loan_key, A.tx_action_name
		FROM T_LOAN_AUDIT L WITH(NOLOCK)
		JOIN T_FSM_ACTION A WITH(NOLOCK) ON A.id_fsm_action_key = L.id_action_key
		WHERE L.is_active = 1
		AND A.tx_action_name = 'SEND_TO_CAD'
		AND L.dtt_mod >= @l_start_of_month
		GROUP BY L.id_loan_key, A.tx_action_name
	) AS X
) AS 'Approved(MD)',
(
	SELECT COUNT(1) FROM
	(
		SELECT  L.id_loan_key, A.tx_action_name
		FROM T_LOAN_AUDIT L WITH(NOLOCK)
		JOIN T_FSM_ACTION A WITH(NOLOCK) ON A.id_fsm_action_key = L.id_action_key
		WHERE L.is_active = 1
		AND A.tx_action_name = 'DISBURSE'
		AND L.dtt_mod >= @l_start_of_month
		GROUP BY L.id_loan_key, A.tx_action_name
	) AS X
) AS 'Disbursed(CAD)', (SELECT CONVERT(date, DATEADD(MONTH, DATEDIFF(MONTH, 0, GETDATE()), 0))) as time


--------------------- Last 2 Months Loans ---------------


SELECT *
, X.Requested - X.Approved - X.Declined AS 'On Process'
FROM
(
	SELECT
	(
		SELECT  COUNT(1) FROM T_LOAN WITH(NOLOCK)
		WHERE is_active = 1
		AND dtt_create >= DATEADD(DAY, -60, CONVERT(date, GETDATE()))
	) AS Requested
	,(
		SELECT COUNT(1) FROM T_LOAN L WITH(NOLOCK)
		JOIN T_FSM_STATE S WITH(NOLOCK) ON L.id_state_key = S.id_fsm_state_key
		JOIN T_FSM_TYPE T WITH(NOLOCK) ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
		WHERE L.is_active = 1 
		AND (S.tx_state_name LIKE '%APPROVED' or S.tx_state_name IN('SENT_TO_CAD', 'SL_GENERATED', 'DISBURSED'))
		AND S.tx_state_name NOT LIKE '%_C_APPROVED'
		AND dtt_create >= DATEADD(DAY, -60, CONVERT(date, GETDATE()))
	) AS Approved
	,(
		SELECT COUNT(1) FROM T_LOAN L WITH(NOLOCK)
		JOIN T_FSM_STATE S WITH(NOLOCK) ON L.id_state_key = S.id_fsm_state_key
		JOIN T_FSM_TYPE T WITH(NOLOCK) ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
		WHERE L.is_active = 1
		AND S.tx_state_name LIKE '%DECLINED'
		AND dtt_create >= DATEADD(DAY, -60, CONVERT(date, GETDATE()))
	 ) AS Declined,  DATEADD(DAY, -60, CONVERT(date, GETDATE())) as time
 ) AS X


 ---------------------- Age Analysis for Cases In Process (Days) ---------------


DROP TABLE IF EXISTS #TEMP_DECLINED_COUNT
DROP TABLE IF EXISTS #TEMP_REQUEST_COUNT
DROP TABLE IF EXISTS #TEMP_APPROVED_COUNT
SELECT CAST(dtt_create AS DATE) AS dt_create , COUNT(1) AS int_count
INTO #TEMP_REQUEST_COUNT
FROM T_LOAN WITH(NOLOCK)
WHERE is_active = 1
GROUP BY CAST(dtt_create AS DATE)

SELECT CAST(dtt_create AS DATE) AS dt_create , COUNT(1) AS int_count
INTO #TEMP_APPROVED_COUNT
FROM T_LOAN L WITH(NOLOCK)
JOIN T_FSM_STATE S WITH(NOLOCK) ON L.id_state_key = S.id_fsm_state_key
JOIN T_FSM_TYPE T WITH(NOLOCK) ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
WHERE L.is_active = 1 
AND (S.tx_state_name LIKE '%APPROVED' or S.tx_state_name IN('SENT_TO_CAD', 'SL_GENERATED', 'DISBURSED'))
AND S.tx_state_name NOT LIKE '%_C_APPROVED'
GROUP BY CAST(dtt_create AS DATE)

SELECT CAST(dtt_create AS DATE) AS dt_create , COUNT(1) AS int_count
INTO #TEMP_DECLINED_COUNT
FROM T_LOAN L WITH(NOLOCK)
JOIN T_FSM_STATE S WITH(NOLOCK) ON L.id_state_key = S.id_fsm_state_key
JOIN T_FSM_TYPE T WITH(NOLOCK) ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
WHERE L.is_active = 1
AND S.tx_state_name LIKE '%DECLINED'
GROUP BY CAST(dtt_create AS DATE)

SELECT 
  ISNULL((SELECT SUM(int_count) FROM #TEMP_REQUEST_COUNT WITH(NOLOCK) WHERE dt_create >= DATEADD(DAY, -6, CONVERT(date, GETDATE()))), 0) 
- ISNULL((SELECT SUM(int_count) FROM #TEMP_APPROVED_COUNT WITH(NOLOCK) WHERE dt_create >= DATEADD(DAY, -6, CONVERT(date, GETDATE()))), 0) 
- ISNULL((SELECT SUM(int_count) FROM #TEMP_DECLINED_COUNT WITH(NOLOCK) WHERE dt_create >= DATEADD(DAY, -6, CONVERT(date, GETDATE()))), 0) 
AS '0-7 Days' 
, ISNULL((SELECT SUM(int_count) FROM #TEMP_REQUEST_COUNT WITH(NOLOCK) WHERE dt_create <= DATEADD(DAY, -15, CONVERT(date, GETDATE())) AND  dt_create >= DATEADD(DAY, -29, CONVERT(date, GETDATE()))), 0) 
- ISNULL((SELECT SUM(int_count) FROM #TEMP_APPROVED_COUNT WITH(NOLOCK) WHERE dt_create <= DATEADD(DAY, -15, CONVERT(date, GETDATE())) AND dt_create >= DATEADD(DAY, -29, CONVERT(date, GETDATE()))), 0) 
- ISNULL((SELECT SUM(int_count) FROM #TEMP_DECLINED_COUNT WITH(NOLOCK) WHERE dt_create <= DATEADD(DAY, -15, CONVERT(date, GETDATE())) AND dt_create >= DATEADD(DAY, -29, CONVERT(date, GETDATE()))), 0) 
AS '16-30 Days'
, ISNULL((SELECT SUM(int_count) FROM #TEMP_REQUEST_COUNT WITH(NOLOCK) WHERE dt_create <= DATEADD(DAY, -30, CONVERT(date, GETDATE())) AND  dt_create >= DATEADD(DAY, -59, CONVERT(date, GETDATE()))), 0) 
- ISNULL((SELECT SUM(int_count) FROM #TEMP_APPROVED_COUNT WITH(NOLOCK) WHERE dt_create <= DATEADD(DAY, -30, CONVERT(date, GETDATE())) AND dt_create >= DATEADD(DAY, -59, CONVERT(date, GETDATE()))), 0) 
- ISNULL((SELECT SUM(int_count) FROM #TEMP_DECLINED_COUNT WITH(NOLOCK) WHERE dt_create <= DATEADD(DAY, -30, CONVERT(date, GETDATE())) AND dt_create >= DATEADD(DAY, -59, CONVERT(date, GETDATE()))), 0) 
AS '31-60 Days'
, ISNULL((SELECT SUM(int_count) FROM #TEMP_REQUEST_COUNT WITH(NOLOCK) WHERE dt_create <= DATEADD(DAY, -60, CONVERT(date, GETDATE())) AND  dt_create >= DATEADD(DAY, -89, CONVERT(date, GETDATE()))), 0) 
- ISNULL((SELECT SUM(int_count) FROM #TEMP_APPROVED_COUNT WITH(NOLOCK) WHERE dt_create <= DATEADD(DAY, -60, CONVERT(date, GETDATE())) AND dt_create >= DATEADD(DAY, -89, CONVERT(date, GETDATE()))), 0) 
- ISNULL((SELECT SUM(int_count) FROM #TEMP_DECLINED_COUNT WITH(NOLOCK) WHERE dt_create <= DATEADD(DAY, -60, CONVERT(date, GETDATE())) AND dt_create >= DATEADD(DAY, -89, CONVERT(date, GETDATE()))), 0) 
AS '61-90 Days'
, ISNULL((SELECT SUM(int_count) FROM #TEMP_REQUEST_COUNT WITH(NOLOCK) WHERE dt_create <= DATEADD(DAY, -90, CONVERT(date, GETDATE())) AND  dt_create >= DATEADD(DAY, -119, CONVERT(date, GETDATE()))), 0) 
- ISNULL((SELECT SUM(int_count) FROM #TEMP_APPROVED_COUNT WITH(NOLOCK) WHERE dt_create <= DATEADD(DAY, -90, CONVERT(date, GETDATE())) AND dt_create >= DATEADD(DAY, -119, CONVERT(date, GETDATE()))), 0) 
- ISNULL((SELECT SUM(int_count) FROM #TEMP_DECLINED_COUNT WITH(NOLOCK) WHERE dt_create <= DATEADD(DAY, -90, CONVERT(date, GETDATE())) AND dt_create >= DATEADD(DAY, -119, CONVERT(date, GETDATE()))), 0) 
AS '91-120 Days'
, ISNULL((SELECT SUM(int_count) FROM #TEMP_REQUEST_COUNT WITH(NOLOCK) WHERE dt_create <= DATEADD(DAY, -120, CONVERT(date, GETDATE()))), 0) 
- ISNULL((SELECT SUM(int_count) FROM #TEMP_APPROVED_COUNT WITH(NOLOCK) WHERE dt_create <= DATEADD(DAY, -120, CONVERT(date, GETDATE()))), 0) 
- ISNULL((SELECT SUM(int_count) FROM #TEMP_DECLINED_COUNT WITH(NOLOCK) WHERE dt_create <= DATEADD(DAY, -120, CONVERT(date, GETDATE()))), 0) 
AS '> 120 Days', (SELECT CONVERT(date, DATEADD(MONTH, DATEDIFF(MONTH, 0, GETDATE()), 0))) as time


------------------------------- New Request Vs Average No. Of New Request -------------------


DECLARE @l_action_name varchar(32) ='${LineChartSelection:csv}'-- 'LAST_30_DAYS' --- LAST_12_MONTHS

IF(@l_action_name = 'LAST 30 DAYS')
BEGIN
	DROP TABLE IF EXISTS #TMP_DATE
	DROP TABLE IF EXISTS #TEMP_COUNT
	CREATE TABLE #TMP_DATE (
		dt_date DATE
		, int_count INT
	)
	INSERT INTO #TMP_DATE(dt_date,int_count) VALUES(GETDATE(), 0)
	DECLARE @l_counter INT = 1
	WHILE ( @l_counter < 30)
	BEGIN
	    INSERT INTO #TMP_DATE(dt_date,int_count) VALUES(DATEADD(day,-1 * @l_counter, GETDATE()), 0)
	    SET @l_counter  = @l_counter  + 1
	END

	SELECT TOP(30) CAST(dtt_create AS DATE) AS dt_create , COUNT(1) AS int_count
	INTO #TEMP_COUNT
	FROM T_LOAN L WITH(NOLOCK) 
	WHERE is_active = 1
	GROUP BY CAST(dtt_create AS DATE)
	ORDER BY CAST(dtt_create AS DATE) DESC

	UPDATE T
	SET int_count = C.int_count
	FROM #TMP_DATE T
	JOIN #TEMP_COUNT C ON C.dt_create = T.dt_date

	SELECT dt_date as time, int_count as 'New Request', (select sum(int_count)/30 from #TMP_DATE) as 'Avarage of New Request' FROM #TMP_DATE
END
ELSE IF(@l_action_name = 'LAST 12 MONTHS')
BEGIN
	DROP TABLE IF EXISTS #TMP_DATE_2
	DROP TABLE IF EXISTS #TEMP_COUNT_2
	CREATE TABLE #TMP_DATE_2 (
		dt_date VARCHAR(32)
		, int_count INT
		, int_order INT
	)
	INSERT INTO #TMP_DATE_2(dt_date,int_count, int_order) VALUES(FORMAT(GETDATE(), 'y'), 0, 0)
	DECLARE @l_counter_2 INT = 1
	WHILE ( @l_counter_2 < 12)
	BEGIN
		INSERT INTO #TMP_DATE_2(dt_date,int_count, int_order) VALUES(FORMAT(DATEADD(MONTH,-1 * @l_counter_2, GETDATE()), 'y'), 0, @l_counter_2)
	    SET @l_counter_2  = @l_counter_2  + 1
	END

	SELECT FORMAT(dtt_create, 'y') AS dt_create , COUNT(1) AS int_count
	INTO #TEMP_COUNT_2
	FROM T_LOAN L WITH(NOLOCK) 
	WHERE is_active = 1
	GROUP BY FORMAT(dtt_create, 'y')
	ORDER BY FORMAT(dtt_create, 'y') DESC

	UPDATE T
	SET int_count = C.int_count
	FROM #TMP_DATE_2 T
	JOIN #TEMP_COUNT_2 C ON C.dt_create = T.dt_date

	SELECT CAST(dt_date AS DATE) as time, int_count as 'New Request',(select sum(int_count)/12 from #TMP_DATE_2) as 'Avarage of New Request' FROM #TMP_DATE_2
	ORDER BY int_order ASC
END

 --------- Department Details  -------------------


-- Pie chart 2
DROP TABLE IF EXISTS #TEMP_LOAN

CREATE TABLE #TEMP_LOAN (
	id_loan_key INT
	, tx_action_name varchar(32)
)

DECLARE @l_action_name varchar(32) = '${PieChartSelection:csv}' --- QUARTALY, YEARLY
, @l_selection_name varchar(32) = '${DepartmentPieChartSelection:csv}'
, @l_year varchar(4) = '2021'


IF(@l_action_name = 'MONTHLY' OR @l_action_name = 'QUARTALY')
BEGIN
	DECLARE @l_value INT = 30
	IF(@l_action_name = 'QUARTALY')
	BEGIN
		SET @l_value = 90
	END
	DECLARE @l_date DATE = (SELECT DATEADD(DAY, -@l_value, CONVERT(date, GETDATE())))

	IF(@l_selection_name = 'ADC(FO)')
	BEGIN
	  
	  	INSERT INTO #TEMP_LOAN(id_loan_key, tx_action_name)
		SELECT L.id_loan_key, A.tx_action_name
		FROM T_LOAN_AUDIT L WITH(NOLOCK)
		JOIN T_FSM_ACTION A WITH(NOLOCK) ON A.id_fsm_action_key = L.id_action_key
		WHERE L.is_active = 1
		AND A.tx_action_name = 'FO_SUBMIT'
		AND L.dtt_mod >= @l_date
		GROUP BY L.id_loan_key, A.tx_action_name
	END
	IF(@l_selection_name = 'PPC(SO)')
	BEGIN
		INSERT INTO #TEMP_LOAN(id_loan_key, tx_action_name)
		SELECT  L.id_loan_key, A.tx_action_name
		FROM T_LOAN_AUDIT L WITH(NOLOCK)
		JOIN T_FSM_ACTION A WITH(NOLOCK) ON A.id_fsm_action_key = L.id_action_key
		WHERE L.is_active = 1
		AND A.tx_action_name = 'SO_RECOMMEND'
		AND L.dtt_mod >= @l_date
		GROUP BY L.id_loan_key, A.tx_action_name
	END	
	IF(@l_selection_name = 'CRM')
	BEGIN
		INSERT INTO #TEMP_LOAN(id_loan_key, tx_action_name)
		SELECT  L.id_loan_key, A.tx_action_name
		FROM T_LOAN_AUDIT L WITH(NOLOCK)
		JOIN T_FSM_ACTION A WITH(NOLOCK) ON A.id_fsm_action_key = L.id_action_key
		WHERE L.is_active = 1
		AND A.tx_action_name IN( 'RM_APPROVE', 'UH_APPROVE', 'HOCRM_APPROVE', 'MD_APPROVE', 'CEO_APPROVE')
		AND L.dtt_mod >= @l_date
		GROUP BY L.id_loan_key, A.tx_action_name
	END
	IF(@l_selection_name = 'CAD')
	BEGIN
		INSERT INTO #TEMP_LOAN(id_loan_key, tx_action_name)
		SELECT  L.id_loan_key, A.tx_action_name
		FROM T_LOAN_AUDIT L WITH(NOLOCK)
		JOIN T_FSM_ACTION A WITH(NOLOCK) ON A.id_fsm_action_key = L.id_action_key
		WHERE L.is_active = 1
		AND A.tx_action_name IN ('GENERATE_SL', 'DISBURSE')
		AND L.dtt_mod >= @l_date
		GROUP BY L.id_loan_key, A.tx_action_name
	END
END
IF(@l_action_name LIKE 'YEARLY-%')
BEGIN
	SET @l_year = RIGHT(@l_action_name, 4) 
		IF(@l_selection_name = 'ADC(FO)')
	BEGIN
		INSERT INTO #TEMP_LOAN(id_loan_key, tx_action_name)
		SELECT L.id_loan_key, A.tx_action_name
		FROM T_LOAN_AUDIT L WITH(NOLOCK)
		JOIN T_FSM_ACTION A WITH(NOLOCK) ON A.id_fsm_action_key = L.id_action_key
		WHERE L.is_active = 1
		AND A.tx_action_name = 'FO_SUBMIT'
		AND DATENAME(year, L.dtt_mod) = @l_year
		GROUP BY L.id_loan_key, A.tx_action_name

	END
	IF(@l_selection_name = 'PPC(SO)')
	BEGIN
		INSERT INTO #TEMP_LOAN(id_loan_key, tx_action_name)
		SELECT  L.id_loan_key, A.tx_action_name
		FROM T_LOAN_AUDIT L WITH(NOLOCK)
		JOIN T_FSM_ACTION A WITH(NOLOCK) ON A.id_fsm_action_key = L.id_action_key
		WHERE L.is_active = 1
		AND A.tx_action_name = 'SO_RECOMMEND'
		AND DATENAME(year, L.dtt_mod) = @l_year
		GROUP BY L.id_loan_key, A.tx_action_name
	END	
	IF(@l_selection_name = 'CRM')
	BEGIN
		INSERT INTO #TEMP_LOAN(id_loan_key, tx_action_name)
		SELECT  L.id_loan_key, A.tx_action_name
		FROM T_LOAN_AUDIT L WITH(NOLOCK)
		JOIN T_FSM_ACTION A WITH(NOLOCK) ON A.id_fsm_action_key = L.id_action_key
		WHERE L.is_active = 1
		AND A.tx_action_name IN( 'RM_APPROVE', 'UH_APPROVE', 'HOCRM_APPROVE', 'MD_APPROVE', 'CEO_APPROVE')
		AND DATENAME(year, L.dtt_mod) = @l_year
		GROUP BY L.id_loan_key, A.tx_action_name
	END
	IF(@l_selection_name = 'CAD')
	BEGIN
		INSERT INTO #TEMP_LOAN(id_loan_key, tx_action_name)
		SELECT  L.id_loan_key, A.tx_action_name
		FROM T_LOAN_AUDIT L WITH(NOLOCK)
		JOIN T_FSM_ACTION A WITH(NOLOCK) ON A.id_fsm_action_key = L.id_action_key
		WHERE L.is_active = 1
		AND A.tx_action_name IN ('GENERATE_SL', 'DISBURSE')
		AND DATENAME(year, L.dtt_mod) = @l_year
		GROUP BY L.id_loan_key, A.tx_action_name
	END
END

SELECT L.tx_loan_tracking_id AS 'Tracking Number' 
	, S.tx_display_text AS 'State'
	, C.tx_customer_name AS 'Name'
	, L.tx_account_no AS 'Account No'
	, C.tx_bp_no AS 'BP No'
	, L.dtt_create AS 'Creation Date'
	, L.dtt_mod AS 'Action Date'
	, L.dec_applied_loan_amount AS 'Applied Loan Amount'
FROM #TEMP_LOAN TL WITH(NOLOCK)
JOIN T_LOAN L ON L.id_loan_key = TL.id_loan_key
JOIN T_FSM_STATE S WITH(NOLOCK) ON L.id_state_key = S.id_fsm_state_key
JOIN T_FSM_TYPE T WITH(NOLOCK) ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
JOIN T_CUSTOMER C WITH(NOLOCK) ON C.id_customer_key = L.id_customer_key



---------------------- Loan Status Details -------------------


DECLARE @l_action_name varchar(32) = '${PieChartSelection:csv}' --- QUARTALY, YEARLY
, @l_selection_name varchar(32) = '${StatusPieChartSelection:csv}'
, @l_year varchar(4) = '2021'


IF(@l_action_name = 'MONTHLY' OR @l_action_name = 'QUARTALY')
BEGIN
	DECLARE @l_value INT = 30
	IF(@l_action_name = 'QUARTALY')
	BEGIN
		SET @l_value = 90
	END
	DECLARE @l_dtt_create DATE = (SELECT DATEADD(DAY, -@l_value, CONVERT(date, GETDATE())))

	IF(@l_selection_name = 'Requested')
	BEGIN
		SELECT L.tx_loan_tracking_id AS 'Tracking Number' 
		, S.tx_display_text AS 'State'
		, C.tx_customer_name AS 'Name'
		, L.tx_account_no AS 'Account No'
		, C.tx_bp_no AS 'BP No'
		, L.dtt_create AS 'Creation Date'
		, L.dtt_mod AS 'Action Date'
		, L.dec_applied_loan_amount AS 'Applied Loan Amount'
		FROM T_LOAN L WITH(NOLOCK)
		JOIN T_FSM_STATE S WITH(NOLOCK) ON L.id_state_key = S.id_fsm_state_key
		JOIN T_FSM_TYPE T WITH(NOLOCK) ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
		JOIN T_CUSTOMER C WITH(NOLOCK) ON C.id_customer_key = L.id_customer_key
		WHERE L.is_active = 1 
		AND L.dtt_create >= @l_dtt_create
	END
	IF(@l_selection_name = 'Approved')
	BEGIN
		SELECT L.tx_loan_tracking_id AS 'Tracking Number' 
		, S.tx_display_text AS 'State'
		, C.tx_customer_name AS 'Name'
		, L.tx_account_no AS 'Account No'
		, C.tx_bp_no AS 'BP No'
		, L.dtt_create AS 'Creation Date'
		, L.dtt_mod AS 'Action Date'
		, L.dec_applied_loan_amount AS 'Applied Loan Amount'
		FROM T_LOAN L WITH(NOLOCK)
		JOIN T_FSM_STATE S WITH(NOLOCK) ON L.id_state_key = S.id_fsm_state_key
		JOIN T_FSM_TYPE T WITH(NOLOCK) ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
		JOIN T_CUSTOMER C WITH(NOLOCK) ON C.id_customer_key = L.id_customer_key
		WHERE L.is_active = 1 
		AND (S.tx_state_name LIKE '%APPROVED' or S.tx_state_name IN('SENT_TO_CAD', 'SL_GENERATED', 'DISBURSED'))
		AND S.tx_state_name NOT LIKE '%_C_APPROVED'
		AND dtt_create >= @l_dtt_create
	END
	IF(@l_selection_name = 'Declined')
	BEGIN
		SELECT L.tx_loan_tracking_id AS 'Tracking Number' 
		, S.tx_display_text AS 'State'
		, C.tx_customer_name AS 'Name'
		, L.tx_account_no AS 'Account No'
		, C.tx_bp_no AS 'BP No'
		, L.dtt_create AS 'Creation Date'
		, L.dtt_mod AS 'Action Date'
		, L.dec_applied_loan_amount AS 'Applied Loan Amount'
		FROM T_LOAN L WITH(NOLOCK)
		JOIN T_FSM_STATE S WITH(NOLOCK) ON L.id_state_key = S.id_fsm_state_key
		JOIN T_FSM_TYPE T WITH(NOLOCK) ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
		JOIN T_CUSTOMER C WITH(NOLOCK) ON C.id_customer_key = L.id_customer_key
		WHERE L.is_active = 1 
		AND S.tx_state_name LIKE '%DECLINED'
		AND dtt_create >= @l_dtt_create
	END
	IF(@l_selection_name = 'On Process')
	BEGIN
		SELECT L.tx_loan_tracking_id AS 'Tracking Number' 
		, S.tx_display_text AS 'State'
		, C.tx_customer_name AS 'Name'
		, L.tx_account_no AS 'Account No'
		, C.tx_bp_no AS 'BP No'
		, L.dtt_create AS 'Creation Date'
		, L.dtt_mod AS 'Action Date'
		, L.dec_applied_loan_amount AS 'Applied Loan Amount'
		FROM T_LOAN L WITH(NOLOCK)
		JOIN T_FSM_STATE S WITH(NOLOCK) ON L.id_state_key = S.id_fsm_state_key
		JOIN T_FSM_TYPE T WITH(NOLOCK) ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
		JOIN T_CUSTOMER C WITH(NOLOCK) ON C.id_customer_key = L.id_customer_key
		WHERE L.is_active = 1 
		AND S.tx_state_name NOT LIKE '%APPROVED' 
		AND S.tx_state_name NOT IN('SENT_TO_CAD', 'SL_GENERATED', 'DISBURSED')
		AND S.tx_state_name NOT LIKE '%DECLINED'
		AND dtt_create >= @l_dtt_create
	END
END
IF(@l_action_name LIKE 'YEARLY-%')
BEGIN
	SET @l_year = RIGHT(@l_action_name, 4) 

	IF(@l_selection_name = 'Requested')
	BEGIN
		SELECT L.tx_loan_tracking_id AS 'Tracking Number' 
		, S.tx_display_text AS 'State'
		, C.tx_customer_name AS 'Name'
		, L.tx_account_no AS 'Account No'
		, C.tx_bp_no AS 'BP No'
		, L.dtt_create AS 'Creation Date'
		, L.dtt_mod AS 'Action Date'
		, L.dec_applied_loan_amount AS 'Applied Loan Amount'
		FROM T_LOAN L WITH(NOLOCK)
		JOIN T_FSM_STATE S WITH(NOLOCK) ON L.id_state_key = S.id_fsm_state_key
		JOIN T_FSM_TYPE T WITH(NOLOCK) ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
		JOIN T_CUSTOMER C WITH(NOLOCK) ON C.id_customer_key = L.id_customer_key
		WHERE L.is_active = 1 
		AND DATENAME(year, dtt_create) = @l_year
	END
	IF(@l_selection_name = 'Approved')
	BEGIN
		SELECT L.tx_loan_tracking_id AS 'Tracking Number' 
		, S.tx_display_text AS 'State'
		, C.tx_customer_name AS 'Name'
		, L.tx_account_no AS 'Account No'
		, C.tx_bp_no AS 'BP No'
		, L.dtt_create AS 'Creation Date'
		, L.dtt_mod AS 'Action Date'
		, L.dec_applied_loan_amount AS 'Applied Loan Amount'
		FROM T_LOAN L WITH(NOLOCK)
		JOIN T_FSM_STATE S WITH(NOLOCK) ON L.id_state_key = S.id_fsm_state_key
		JOIN T_FSM_TYPE T WITH(NOLOCK) ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
		JOIN T_CUSTOMER C WITH(NOLOCK) ON C.id_customer_key = L.id_customer_key
		WHERE L.is_active = 1 
		AND (S.tx_state_name LIKE '%APPROVED' or S.tx_state_name IN('SENT_TO_CAD', 'SL_GENERATED', 'DISBURSED'))
		AND S.tx_state_name NOT LIKE '%_C_APPROVED'
		AND DATENAME(year, dtt_create) = @l_year
	END
	IF(@l_selection_name = 'Declined')
	BEGIN
		SELECT L.tx_loan_tracking_id AS 'Tracking Number' 
		, S.tx_display_text AS 'State'
		, C.tx_customer_name AS 'Name'
		, L.tx_account_no AS 'Account No'
		, C.tx_bp_no AS 'BP No'
		, L.dtt_create AS 'Creation Date'
		, L.dtt_mod AS 'Action Date'
		, L.dec_applied_loan_amount AS 'Applied Loan Amount'
		FROM T_LOAN L WITH(NOLOCK)
		JOIN T_FSM_STATE S WITH(NOLOCK) ON L.id_state_key = S.id_fsm_state_key
		JOIN T_FSM_TYPE T WITH(NOLOCK) ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
		JOIN T_CUSTOMER C WITH(NOLOCK) ON C.id_customer_key = L.id_customer_key
		WHERE L.is_active = 1 
		AND S.tx_state_name LIKE '%DECLINED'
		AND DATENAME(year, dtt_create) = @l_year
	END
	IF(@l_selection_name = 'On Process')
	BEGIN
		SELECT L.tx_loan_tracking_id AS 'Tracking Number' 
		, S.tx_display_text AS 'State'
		, C.tx_customer_name AS 'Name'
		, L.tx_account_no AS 'Account No'
		, C.tx_bp_no AS 'BP No'
		, L.dtt_create AS 'Creation Date'
		, L.dtt_mod AS 'Action Date'
		, L.dec_applied_loan_amount AS 'Applied Loan Amount'
		FROM T_LOAN L WITH(NOLOCK)
		JOIN T_FSM_STATE S WITH(NOLOCK) ON L.id_state_key = S.id_fsm_state_key
		JOIN T_FSM_TYPE T WITH(NOLOCK) ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
		JOIN T_CUSTOMER C WITH(NOLOCK) ON C.id_customer_key = L.id_customer_key
		WHERE L.is_active = 1 
		AND S.tx_state_name NOT LIKE '%APPROVED' 
		AND S.tx_state_name NOT IN('SENT_TO_CAD', 'SL_GENERATED', 'DISBURSED')
		AND S.tx_state_name NOT LIKE '%DECLINED'
		AND DATENAME(year, dtt_create) = @l_year
	END
END








