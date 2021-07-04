
-- Total (start to end)

SELECT *
, X.count_requested - X.count_approved - X.count_declined AS count_on_process 
FROM
(
	SELECT
	(
		SELECT COUNT(1) FROM T_LOAN WITH(NOLOCK)
		WHERE is_active = 1
	) AS count_requested
	,(
		SELECT COUNT(1) FROM T_LOAN L WITH(NOLOCK)
		JOIN T_FSM_STATE S WITH(NOLOCK) ON L.id_state_key = S.id_fsm_state_key
		JOIN T_FSM_TYPE T WITH(NOLOCK) ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
		WHERE L.is_active = 1 
		AND (S.tx_state_name LIKE '%APPROVED' or S.tx_state_name IN('SENT_TO_CAD', 'SL_GENERATED', 'DISBURSED'))
		AND S.tx_state_name NOT LIKE '%_C_APPROVED'
	) AS count_approved
	,(
		SELECT COUNT(1) FROM T_LOAN L WITH(NOLOCK)
		JOIN T_FSM_STATE S WITH(NOLOCK) ON L.id_state_key = S.id_fsm_state_key
		JOIN T_FSM_TYPE T WITH(NOLOCK) ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
		WHERE L.is_active = 1
		AND S.tx_state_name LIKE '%DECLINED'
	 ) AS count_declined
 ) AS X


-- Last Two Month's Loan

SELECT *
, X.count_requested - X.count_approved - X.count_declined AS count_on_process 
FROM
(
	SELECT
	(
		SELECT COUNT(1) FROM T_LOAN WITH(NOLOCK)
		WHERE is_active = 1
		AND dtt_create >= DATEADD(DAY, -60, CONVERT(date, GETDATE()))
	) AS count_requested
	,(
		SELECT COUNT(1) FROM T_LOAN L WITH(NOLOCK)
		JOIN T_FSM_STATE S WITH(NOLOCK) ON L.id_state_key = S.id_fsm_state_key
		JOIN T_FSM_TYPE T WITH(NOLOCK) ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
		WHERE L.is_active = 1 
		AND (S.tx_state_name LIKE '%APPROVED' or S.tx_state_name IN('SENT_TO_CAD', 'SL_GENERATED', 'DISBURSED'))
		AND S.tx_state_name NOT LIKE '%_C_APPROVED'
		AND dtt_create >= DATEADD(DAY, -60, CONVERT(date, GETDATE()))
	) AS count_approved
	,(
		SELECT COUNT(1) FROM T_LOAN L WITH(NOLOCK)
		JOIN T_FSM_STATE S WITH(NOLOCK) ON L.id_state_key = S.id_fsm_state_key
		JOIN T_FSM_TYPE T WITH(NOLOCK) ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
		WHERE L.is_active = 1
		AND S.tx_state_name LIKE '%DECLINED'
		AND dtt_create >= DATEADD(DAY, -60, CONVERT(date, GETDATE()))
	 ) AS count_declined
 ) AS X


-- On Process State

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
  ISNULL((SELECT SUM(int_count) FROM #TEMP_REQUEST_COUNT WITH(NOLOCK) WHERE dt_create >= DATEADD(DAY, -14, CONVERT(date, GETDATE()))), 0) 
- ISNULL((SELECT SUM(int_count) FROM #TEMP_APPROVED_COUNT WITH(NOLOCK) WHERE dt_create >= DATEADD(DAY, -14, CONVERT(date, GETDATE()))), 0) 
- ISNULL((SELECT SUM(int_count) FROM #TEMP_DECLINED_COUNT WITH(NOLOCK) WHERE dt_create >= DATEADD(DAY, -14, CONVERT(date, GETDATE()))), 0) 
AS on_process_15_days 
, ISNULL((SELECT SUM(int_count) FROM #TEMP_REQUEST_COUNT WITH(NOLOCK) WHERE dt_create <= DATEADD(DAY, -15, CONVERT(date, GETDATE())) AND  dt_create >= DATEADD(DAY, -29, CONVERT(date, GETDATE()))), 0) 
- ISNULL((SELECT SUM(int_count) FROM #TEMP_APPROVED_COUNT WITH(NOLOCK) WHERE dt_create <= DATEADD(DAY, -15, CONVERT(date, GETDATE())) AND dt_create >= DATEADD(DAY, -29, CONVERT(date, GETDATE()))), 0) 
- ISNULL((SELECT SUM(int_count) FROM #TEMP_DECLINED_COUNT WITH(NOLOCK) WHERE dt_create <= DATEADD(DAY, -15, CONVERT(date, GETDATE())) AND dt_create >= DATEADD(DAY, -29, CONVERT(date, GETDATE()))), 0) 
AS on_process_30_days
, ISNULL((SELECT SUM(int_count) FROM #TEMP_REQUEST_COUNT WITH(NOLOCK) WHERE dt_create <= DATEADD(DAY, -30, CONVERT(date, GETDATE())) AND  dt_create >= DATEADD(DAY, -59, CONVERT(date, GETDATE()))), 0) 
- ISNULL((SELECT SUM(int_count) FROM #TEMP_APPROVED_COUNT WITH(NOLOCK) WHERE dt_create <= DATEADD(DAY, -30, CONVERT(date, GETDATE())) AND dt_create >= DATEADD(DAY, -59, CONVERT(date, GETDATE()))), 0) 
- ISNULL((SELECT SUM(int_count) FROM #TEMP_DECLINED_COUNT WITH(NOLOCK) WHERE dt_create <= DATEADD(DAY, -30, CONVERT(date, GETDATE())) AND dt_create >= DATEADD(DAY, -59, CONVERT(date, GETDATE()))), 0) 
AS on_process_60_days
, ISNULL((SELECT SUM(int_count) FROM #TEMP_REQUEST_COUNT WITH(NOLOCK) WHERE dt_create <= DATEADD(DAY, -60, CONVERT(date, GETDATE())) AND  dt_create >= DATEADD(DAY, -89, CONVERT(date, GETDATE()))), 0) 
- ISNULL((SELECT SUM(int_count) FROM #TEMP_APPROVED_COUNT WITH(NOLOCK) WHERE dt_create <= DATEADD(DAY, -60, CONVERT(date, GETDATE())) AND dt_create >= DATEADD(DAY, -89, CONVERT(date, GETDATE()))), 0) 
- ISNULL((SELECT SUM(int_count) FROM #TEMP_DECLINED_COUNT WITH(NOLOCK) WHERE dt_create <= DATEADD(DAY, -60, CONVERT(date, GETDATE())) AND dt_create >= DATEADD(DAY, -89, CONVERT(date, GETDATE()))), 0) 
AS on_process_90_days
, ISNULL((SELECT SUM(int_count) FROM #TEMP_REQUEST_COUNT WITH(NOLOCK) WHERE dt_create <= DATEADD(DAY, -90, CONVERT(date, GETDATE())) AND  dt_create >= DATEADD(DAY, -119, CONVERT(date, GETDATE()))), 0) 
- ISNULL((SELECT SUM(int_count) FROM #TEMP_APPROVED_COUNT WITH(NOLOCK) WHERE dt_create <= DATEADD(DAY, -90, CONVERT(date, GETDATE())) AND dt_create >= DATEADD(DAY, -119, CONVERT(date, GETDATE()))), 0) 
- ISNULL((SELECT SUM(int_count) FROM #TEMP_DECLINED_COUNT WITH(NOLOCK) WHERE dt_create <= DATEADD(DAY, -90, CONVERT(date, GETDATE())) AND dt_create >= DATEADD(DAY, -119, CONVERT(date, GETDATE()))), 0) 
AS on_process_120_days
, ISNULL((SELECT SUM(int_count) FROM #TEMP_REQUEST_COUNT WITH(NOLOCK) WHERE dt_create <= DATEADD(DAY, -120, CONVERT(date, GETDATE()))), 0) 
- ISNULL((SELECT SUM(int_count) FROM #TEMP_APPROVED_COUNT WITH(NOLOCK) WHERE dt_create <= DATEADD(DAY, -120, CONVERT(date, GETDATE()))), 0) 
- ISNULL((SELECT SUM(int_count) FROM #TEMP_DECLINED_COUNT WITH(NOLOCK) WHERE dt_create <= DATEADD(DAY, -120, CONVERT(date, GETDATE()))), 0) 
AS on_process_120_plus_days

DROP TABLE #TEMP_REQUEST_COUNT
DROP TABLE #TEMP_APPROVED_COUNT
DROP TABLE #TEMP_DECLINED_COUNT

-- Last Seven Day's Request

CREATE TABLE #TMP_DATE (
	dt_date DATE
	, int_count INT
)
INSERT INTO #TMP_DATE(dt_date,int_count) VALUES(GETDATE(), 0)
DECLARE @l_counter INT = 1
WHILE ( @l_counter < 7)
BEGIN
    INSERT INTO #TMP_DATE(dt_date,int_count) VALUES(DATEADD(day,-1 * @l_counter, GETDATE()), 0)
    SET @l_counter  = @l_counter  + 1
END

SELECT TOP(7) CAST(dtt_create AS DATE) AS dt_create , COUNT(1) AS int_count
INTO #TEMP_COUNT
FROM T_LOAN L WITH(NOLOCK) 
WHERE is_active = 1
GROUP BY CAST(dtt_create AS DATE)
ORDER BY CAST(dtt_create AS DATE) DESC

UPDATE T
SET int_count = C.int_count
FROM #TMP_DATE T
JOIN #TEMP_COUNT C ON C.dt_create = T.dt_date

SELECT * FROM #TMP_DATE

DROP TABLE #TMP_DATE
DROP TABLE #TEMP_COUNT

-- This Month Action 

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
) AS count_submitted_web,
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
) AS count_submitted_mobile,
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
) AS count_ppc_recommended,
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
) AS count_endorsed,
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
) AS count_approved,
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
) AS count_disburse


-- Approved Amount (BDT)

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
	SELECT SUM(L.dec_recommended_for_approval) 
	FROM #TEMP_LAST_3_MONTH_APPROVED_LOAN AL WITH(NOLOCK)
	JOIN T_LOAN L WITH(NOLOCK) ON L.id_loan_key = AL.id_loan_key
) AS approve_amount_last_3_month,
(
	SELECT SUM(L.dec_recommended_for_approval) 
	FROM #TEMP_LAST_2_MONTH_APPROVED_LOAN AL WITH(NOLOCK)
	JOIN T_LOAN L WITH(NOLOCK) ON L.id_loan_key = AL.id_loan_key
) AS approve_amount_last_2_month,
(
	SELECT SUM(L.dec_recommended_for_approval) 
	FROM #TEMP_LAST_1_MONTH_APPROVED_LOAN AL WITH(NOLOCK)
	JOIN T_LOAN L WITH(NOLOCK) ON L.id_loan_key = AL.id_loan_key
) AS approve_amount_last_1_month

DROP TABLE #TEMP_LAST_3_MONTH_APPROVED_LOAN
DROP TABLE #TEMP_LAST_2_MONTH_APPROVED_LOAN
DROP TABLE #TEMP_LAST_1_MONTH_APPROVED_LOAN

-- Graphical representation of last 30 days

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

SELECT * FROM #TMP_DATE

DROP TABLE #TMP_DATE
DROP TABLE #TEMP_COUNT

-- Graphical representation of last 12 month

CREATE TABLE #TMP_DATE (
	dt_date VARCHAR(32)
	, int_count INT
	, int_order INT
)
INSERT INTO #TMP_DATE(dt_date,int_count, int_order) VALUES(FORMAT(GETDATE(), 'y'), 0, 0)
DECLARE @l_counter INT = 1
WHILE ( @l_counter < 12)
BEGIN
	INSERT INTO #TMP_DATE(dt_date,int_count, int_order) VALUES(FORMAT(DATEADD(MONTH,-1 * @l_counter, GETDATE()), 'y'), 0, @l_counter)
    SET @l_counter  = @l_counter  + 1
END

SELECT FORMAT(dtt_create, 'y') AS dt_create , COUNT(1) AS int_count
INTO #TEMP_COUNT
FROM T_LOAN L WITH(NOLOCK) 
WHERE is_active = 1
GROUP BY FORMAT(dtt_create, 'y')
ORDER BY FORMAT(dtt_create, 'y') DESC

UPDATE T
SET int_count = C.int_count
FROM #TMP_DATE T
JOIN #TEMP_COUNT C ON C.dt_create = T.dt_date

SELECT dt_date, int_count FROM #TMP_DATE
ORDER BY int_order ASC

DROP TABLE #TMP_DATE
DROP TABLE #TEMP_COUNT

-- Pie chart 1 -- FOR last 30 days / monthly

SELECT X.count_approved, X.count_declined
, X.count_requested - X.count_approved - X.count_declined AS count_on_process 
FROM
(
	SELECT
	(
		SELECT COUNT(1) FROM T_LOAN WITH(NOLOCK)
		WHERE is_active = 1
		AND dtt_create >= DATEADD(DAY, -30, CONVERT(date, GETDATE()))
	) AS count_requested
	,(
		SELECT COUNT(1) FROM T_LOAN L WITH(NOLOCK)
		JOIN T_FSM_STATE S WITH(NOLOCK) ON L.id_state_key = S.id_fsm_state_key
		JOIN T_FSM_TYPE T WITH(NOLOCK) ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
		WHERE L.is_active = 1 
		AND (S.tx_state_name LIKE '%APPROVED' or S.tx_state_name IN('SENT_TO_CAD', 'SL_GENERATED', 'DISBURSED'))
		AND S.tx_state_name NOT LIKE '%_C_APPROVED'
		AND dtt_create >= DATEADD(DAY, -30, CONVERT(date, GETDATE()))
	) AS count_approved
	,(
		SELECT COUNT(1) FROM T_LOAN L WITH(NOLOCK)
		JOIN T_FSM_STATE S WITH(NOLOCK) ON L.id_state_key = S.id_fsm_state_key
		JOIN T_FSM_TYPE T WITH(NOLOCK) ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
		WHERE L.is_active = 1
		AND S.tx_state_name LIKE '%DECLINED'
		AND dtt_create >= DATEADD(DAY, -30, CONVERT(date, GETDATE()))
	 ) AS count_declined
 ) AS X

-- Pie chart 1 -- FOR last 90 days / quartaly

SELECT X.count_approved, X.count_declined
, X.count_requested - X.count_approved - X.count_declined AS count_on_process 
FROM
(
	SELECT
	(
		SELECT COUNT(1) FROM T_LOAN WITH(NOLOCK)
		WHERE is_active = 1
		AND dtt_create >= DATEADD(DAY, -90, CONVERT(date, GETDATE()))
	) AS count_requested
	,(
		SELECT COUNT(1) FROM T_LOAN L WITH(NOLOCK)
		JOIN T_FSM_STATE S WITH(NOLOCK) ON L.id_state_key = S.id_fsm_state_key
		JOIN T_FSM_TYPE T WITH(NOLOCK) ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
		WHERE L.is_active = 1 
		AND (S.tx_state_name LIKE '%APPROVED' or S.tx_state_name IN('SENT_TO_CAD', 'SL_GENERATED', 'DISBURSED'))
		AND S.tx_state_name NOT LIKE '%_C_APPROVED'
		AND dtt_create >= DATEADD(DAY, -90, CONVERT(date, GETDATE()))
	) AS count_approved
	,(
		SELECT COUNT(1) FROM T_LOAN L WITH(NOLOCK)
		JOIN T_FSM_STATE S WITH(NOLOCK) ON L.id_state_key = S.id_fsm_state_key
		JOIN T_FSM_TYPE T WITH(NOLOCK) ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
		WHERE L.is_active = 1
		AND S.tx_state_name LIKE '%DECLINED'
		AND dtt_create >= DATEADD(DAY, -90, CONVERT(date, GETDATE()))
	 ) AS count_declined
 ) AS X

-- Pie chart 1 -- FOR yearly / must need to pass value of @l_year

DECLARE @l_year varchar(4) = '2021'

SELECT X.count_approved, X.count_declined
, X.count_requested - X.count_approved - X.count_declined AS count_on_process 
FROM
(
	SELECT
	(
		SELECT COUNT(1) FROM T_LOAN WITH(NOLOCK)
		WHERE is_active = 1
		AND DATENAME(year, dtt_create) = @l_year
	) AS count_requested
	,(
		SELECT COUNT(1) FROM T_LOAN L WITH(NOLOCK)
		JOIN T_FSM_STATE S WITH(NOLOCK) ON L.id_state_key = S.id_fsm_state_key
		JOIN T_FSM_TYPE T WITH(NOLOCK) ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
		WHERE L.is_active = 1 
		AND (S.tx_state_name LIKE '%APPROVED' or S.tx_state_name IN('SENT_TO_CAD', 'SL_GENERATED', 'DISBURSED'))
		AND S.tx_state_name NOT LIKE '%_C_APPROVED'
		AND DATENAME(year, dtt_create) = @l_year
	) AS count_approved
	,(
		SELECT COUNT(1) FROM T_LOAN L WITH(NOLOCK)
		JOIN T_FSM_STATE S WITH(NOLOCK) ON L.id_state_key = S.id_fsm_state_key
		JOIN T_FSM_TYPE T WITH(NOLOCK) ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
		WHERE L.is_active = 1
		AND S.tx_state_name LIKE '%DECLINED'
		AND DATENAME(year, dtt_create) = @l_year
	 ) AS count_declined
 ) AS X


-- Pie chart 2 -- FOR last 30 days / monthly 

SELECT 
(
	SELECT COUNT(1) FROM
	(
		SELECT  L.id_loan_key, A.tx_action_name
		FROM T_LOAN_AUDIT L WITH(NOLOCK)
		JOIN T_FSM_ACTION A WITH(NOLOCK) ON A.id_fsm_action_key = L.id_action_key
		WHERE L.is_active = 1
		AND A.tx_action_name = 'FO_SUBMIT'
		AND L.dtt_mod >= DATEADD(DAY, -30, CONVERT(date, GETDATE()))
		GROUP BY L.id_loan_key, A.tx_action_name
	) AS X
) AS count_submitted,
(
	SELECT COUNT(1) FROM
	(
		SELECT  L.id_loan_key, A.tx_action_name
		FROM T_LOAN_AUDIT L WITH(NOLOCK)
		JOIN T_FSM_ACTION A WITH(NOLOCK) ON A.id_fsm_action_key = L.id_action_key
		WHERE L.is_active = 1
		AND A.tx_action_name = 'SO_RECOMMEND'
		AND L.dtt_mod >= DATEADD(DAY, -30, CONVERT(date, GETDATE()))
		GROUP BY L.id_loan_key, A.tx_action_name
	) AS X
) AS count_so_recommended,
(
	SELECT COUNT(1) FROM
	(
		SELECT  L.id_loan_key, A.tx_action_name
		FROM T_LOAN_AUDIT L WITH(NOLOCK)
		JOIN T_FSM_ACTION A WITH(NOLOCK) ON A.id_fsm_action_key = L.id_action_key
		WHERE L.is_active = 1
		AND A.tx_action_name IN( 'RM_APPROVE', 'UH_APPROVE', 'HOCRM_APPROVE', 'MD_APPROVE', 'CEO_APPROVE')
		AND L.dtt_mod >= DATEADD(DAY, -30, CONVERT(date, GETDATE()))
		GROUP BY L.id_loan_key, A.tx_action_name
	) AS X
) AS count_crm,
(
	SELECT COUNT(1) FROM
	(
		SELECT  L.id_loan_key, A.tx_action_name
		FROM T_LOAN_AUDIT L WITH(NOLOCK)
		JOIN T_FSM_ACTION A WITH(NOLOCK) ON A.id_fsm_action_key = L.id_action_key
		WHERE L.is_active = 1
		AND A.tx_action_name IN ('GENERATE_SL', 'DISBURSE')
		AND L.dtt_mod >= DATEADD(DAY, -30, CONVERT(date, GETDATE()))
		GROUP BY L.id_loan_key, A.tx_action_name
	) AS X
) AS count_cad


-- Pie chart 2 -- FOR last 90 days / quartaly

SELECT 
(
	SELECT COUNT(1) FROM
	(
		SELECT  L.id_loan_key, A.tx_action_name
		FROM T_LOAN_AUDIT L WITH(NOLOCK)
		JOIN T_FSM_ACTION A WITH(NOLOCK) ON A.id_fsm_action_key = L.id_action_key
		WHERE L.is_active = 1
		AND A.tx_action_name = 'FO_SUBMIT'
		AND L.dtt_mod >= DATEADD(DAY, -90, CONVERT(date, GETDATE()))
		GROUP BY L.id_loan_key, A.tx_action_name
	) AS X
) AS count_submitted,
(
	SELECT COUNT(1) FROM
	(
		SELECT  L.id_loan_key, A.tx_action_name
		FROM T_LOAN_AUDIT L WITH(NOLOCK)
		JOIN T_FSM_ACTION A WITH(NOLOCK) ON A.id_fsm_action_key = L.id_action_key
		WHERE L.is_active = 1
		AND A.tx_action_name = 'SO_RECOMMEND'
		AND L.dtt_mod >= DATEADD(DAY, -90, CONVERT(date, GETDATE()))
		GROUP BY L.id_loan_key, A.tx_action_name
	) AS X
) AS count_so_recommended,
(
	SELECT COUNT(1) FROM
	(
		SELECT  L.id_loan_key, A.tx_action_name
		FROM T_LOAN_AUDIT L WITH(NOLOCK)
		JOIN T_FSM_ACTION A WITH(NOLOCK) ON A.id_fsm_action_key = L.id_action_key
		WHERE L.is_active = 1
		AND A.tx_action_name IN( 'RM_APPROVE', 'UH_APPROVE', 'HOCRM_APPROVE', 'MD_APPROVE', 'CEO_APPROVE')
		AND L.dtt_mod >= DATEADD(DAY, -90, CONVERT(date, GETDATE()))
		GROUP BY L.id_loan_key, A.tx_action_name
	) AS X
) AS count_crm,
(
	SELECT COUNT(1) FROM
	(
		SELECT  L.id_loan_key, A.tx_action_name
		FROM T_LOAN_AUDIT L WITH(NOLOCK)
		JOIN T_FSM_ACTION A WITH(NOLOCK) ON A.id_fsm_action_key = L.id_action_key
		WHERE L.is_active = 1
		AND A.tx_action_name IN ('GENERATE_SL', 'DISBURSE')
		AND L.dtt_mod >= DATEADD(DAY, -90, CONVERT(date, GETDATE()))
		GROUP BY L.id_loan_key, A.tx_action_name
	) AS X
) AS count_cad


-- Pie chart 2 -- FOR yearly / must need to pass value of @l_year

DECLARE @l_year varchar(4) = '2021'
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
) AS count_submitted,
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
) AS count_so_recommended,
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
) AS count_crm,
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
) AS count_cad