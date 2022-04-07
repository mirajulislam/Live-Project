USE [LMS_PROD_CBBL]
GO
/****** Object:  StoredProcedure [dbo].[RPT_loan_status_v2]    Script Date: 11/24/2021 11:45:35 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROC [dbo].[RPT_loan_status_v2]
(
	  @tx_report_name 	varchar(128) 	= 'RPT_STATUS_BY_ORIG_DATE'
	, @dt_create 		varchar(32)		= NULL
	, @tx_queue_name 	varchar(32) 	= NULL
	, @is_aggregate		int 			= 0
	, @tx_period		varchar(8)		= 'ALL'
)
AS
BEGIN

	DECLARE @l_dt_tdy date = GETDATE()

	-- RPT_Q_STATUS_BY_ORIG_DATE
	IF (@tx_report_name = 'RPT_STATUS_BY_ORIG_DATE')
	BEGIN

		INSERT INTO T_TMP_MSG_LOG VALUES(@l_dt_tdy, 'Running RPT_STATUS_BY_ORIG_DATE')

		IF NOT EXISTS (SELECT name FROM sys.tables WHERE name = 'TMP_T_STATE_MAP')
		BEGIN
			CREATE TABLE TMP_T_STATE_MAP
			(
				  tx_state_name varchar(32)
				, tx_queue_name varchar(32)
			)

			INSERT INTO TMP_T_STATE_MAP VALUES('FO_CREATED', 'FO_Q')
			INSERT INTO TMP_T_STATE_MAP VALUES('FO_UPDATED', 'FO_Q')
			INSERT INTO TMP_T_STATE_MAP VALUES('FO_SUBMITTED', 'SO_Q')
			INSERT INTO TMP_T_STATE_MAP VALUES('SO_CREATED', 'SO_Q')
			INSERT INTO TMP_T_STATE_MAP VALUES('SO_UPDATED', 'SO_Q')
			INSERT INTO TMP_T_STATE_MAP VALUES('SO_RECOMMENDED', 'PPC_Q')
			INSERT INTO TMP_T_STATE_MAP VALUES('SO_RE_RECOMMENDED', 'PPC_Q')
			INSERT INTO TMP_T_STATE_MAP VALUES('PEND_RECEIVED', 'CRM_Q')
			INSERT INTO TMP_T_STATE_MAP VALUES('CA_RECEIVED', 'CRM_Q')
			INSERT INTO TMP_T_STATE_MAP VALUES('CA_UPDATED', 'CRM_Q')
			INSERT INTO TMP_T_STATE_MAP VALUES('CA_RECOMMENDED', 'CRM_Q')
			INSERT INTO TMP_T_STATE_MAP VALUES('UH_APPROVED_0', 'CRM_Q')
			INSERT INTO TMP_T_STATE_MAP VALUES('UH_APPROVED_1', 'CEO_Q')
			INSERT INTO TMP_T_STATE_MAP VALUES('SENT_TO_CAD', 'CAD_Q')
			INSERT INTO TMP_T_STATE_MAP VALUES('SL_GENERATED', 'DISBURSED_Q')
			INSERT INTO TMP_T_STATE_MAP VALUES('APPROVED_RETURNED', 'CRM_Q')
			INSERT INTO TMP_T_STATE_MAP VALUES('CA_CAD_QUERY_UPDATED', 'CAD_Q')
			INSERT INTO TMP_T_STATE_MAP VALUES('CA_RETURNED', 'PPC_Q')
			INSERT INTO TMP_T_STATE_MAP VALUES('CA_SENT_QUERY', 'PPC_Q')
			INSERT INTO TMP_T_STATE_MAP VALUES('CAD_RETURNED', 'CRM_Q')
			INSERT INTO TMP_T_STATE_MAP VALUES('CAD_SENT_QUERY_TO_CA', 'CRM_Q')
			INSERT INTO TMP_T_STATE_MAP VALUES('CEO_APPROVED', 'CAD_Q')
			INSERT INTO TMP_T_STATE_MAP VALUES('CEO_DECLINED', 'DECLINED_Q')
			INSERT INTO TMP_T_STATE_MAP VALUES('CEO_DEFERED', 'DEFFERED_Q')
			INSERT INTO TMP_T_STATE_MAP VALUES('FO_DELETED', 'DELETED_Q')
			INSERT INTO TMP_T_STATE_MAP VALUES('HOCRM_APPROVED', 'CEO_Q')
			INSERT INTO TMP_T_STATE_MAP VALUES('HOCRM_RETURNED', 'CRM_Q')
			INSERT INTO TMP_T_STATE_MAP VALUES('MIS_ALLOCATED', 'MISC_Q')
			INSERT INTO TMP_T_STATE_MAP VALUES('MIS_RECEIVED', 'MISC_Q')
			INSERT INTO TMP_T_STATE_MAP VALUES('MIS_RETURNED', 'MISC_Q')
			INSERT INTO TMP_T_STATE_MAP VALUES('MIS_UPDATED', 'MISC_Q')
			INSERT INTO TMP_T_STATE_MAP VALUES('PPC_RETURNED', 'SO_Q')
			INSERT INTO TMP_T_STATE_MAP VALUES('RM_APPROVED', 'CEO_Q')
			INSERT INTO TMP_T_STATE_MAP VALUES('RM_RETURNED', 'PPC_Q')
			INSERT INTO TMP_T_STATE_MAP VALUES('SO_DELETED', 'DELETED_Q')
			INSERT INTO TMP_T_STATE_MAP VALUES('UH_APPROVED', 'CAD_Q')
			INSERT INTO TMP_T_STATE_MAP VALUES('UH_C_APPROVED', 'CAD_Q')
			INSERT INTO TMP_T_STATE_MAP VALUES('UH_DECLINED', 'DECLINED_Q')
			INSERT INTO TMP_T_STATE_MAP VALUES('UH_DEFERED', 'DEFFERED_Q')
			INSERT INTO TMP_T_STATE_MAP VALUES('UH_RETURNED', 'PPC_Q')

			CREATE INDEX idx_state_name ON TMP_T_STATE_MAP (tx_state_name)
		END

		IF NOT EXISTS (SELECT name from sys.tables WHERE name = 'TMP_T_QUEUE_PRIORITY')
		BEGIN
			CREATE TABLE TMP_T_QUEUE_PRIORITY
			(
				  tx_queue_name varchar(32)
				, int_priority int
			)

			INSERT INTO TMP_T_QUEUE_PRIORITY VALUES('FO_Q', 1)
			INSERT INTO TMP_T_QUEUE_PRIORITY VALUES('SO_Q', 2)
			INSERT INTO TMP_T_QUEUE_PRIORITY VALUES('PPC_Q', 3)
			INSERT INTO TMP_T_QUEUE_PRIORITY VALUES('CRM_Q', 4)
			INSERT INTO TMP_T_QUEUE_PRIORITY VALUES('CEO_Q', 5)
			INSERT INTO TMP_T_QUEUE_PRIORITY VALUES('CAD_Q', 6)
			INSERT INTO TMP_T_QUEUE_PRIORITY VALUES('DEFFERED_Q', 7)
			INSERT INTO TMP_T_QUEUE_PRIORITY VALUES('DISBURSED_Q', 8)
			INSERT INTO TMP_T_QUEUE_PRIORITY VALUES('DECLINED_Q', 9)
			INSERT INTO TMP_T_QUEUE_PRIORITY VALUES('MISC_Q', 10)
			INSERT INTO TMP_T_QUEUE_PRIORITY VALUES('DELETED_Q', 11)

			CREATE INDEX idx_queue_name ON TMP_T_QUEUE_PRIORITY(tx_queue_name)
		END

		IF NOT EXISTS (SELECT name from tempdb.sys.tables WHERE name = '##T_LMS_REPORT')
		BEGIN
			CREATE TABLE ##T_LMS_REPORT
			(
				  dt_create 		date
				, ct_tot 			int default 0
				, ct_eloan 			int default 0
				, ct_lms 			int default 0
				, v_ct_tot 			as ct_eloan + ct_lms
				, ct_fo_q 			int default 0
				, ct_so_q 			int default 0
				, ct_ppc_q 			int default 0
				, ct_crm_q 			int default 0
				, ct_ceo_q 			int default 0
				, ct_cad_q 			int default 0
				, ct_deffered_q		int default 0
				, ct_disbursed_q	int default 0
				, ct_declined_q 	int default 0
				, ct_deleted_q 		int default 0
				, ct_misc_q 		int default 0
				, ct_q_tot 			aS ct_fo_q + ct_so_q + ct_ppc_q + ct_crm_q + ct_ceo_q + ct_cad_q + ct_deffered_q + ct_disbursed_q + ct_declined_q + ct_deleted_q + ct_misc_q
			)

			CREATE INDEX idx_orig_date ON ##T_LMS_REPORT(dt_create)
		END

		TRUNCATE TABLE ##T_LMS_REPORT

		IF EXISTS (SELECT 1 FROM tempdb.sys.tables WHERE name = '##TMP_T_LOAN')
		BEGIN
			DROP TABLE ##TMP_T_LOAN
		END

		DECLARE @l_tmp_tx varchar(32)

		SELECT    L.id_loan_key
				, L.id_loan_ver
				, dt_create = CONVERT(date, L.dtt_create)
				, L.dtt_mod
				, L.id_state_key
				, L.id_action_key
				, S.tx_state_name
				, A.tx_action_name
				, tx_loan_type = C.tx_value1
				, L.tx_data_source
				, int_in_group
				, tx_queue_name = @l_tmp_tx
		INTO ##TMP_T_LOAN
		FROM T_LOAN 			L
		JOIN T_FSM_STATE 		S ON S.id_fsm_state_key 	= L.id_state_key
		JOIN T_FSM_ACTION 		A ON A.id_fsm_action_key 	= L.id_action_key
		JOIN T_CONFIGURATION 	C ON C.id_configuration_key = L.id_loan_type_key

		CREATE INDEX idx_create_dt 	ON ##TMP_T_LOAN (dt_create)
		CREATE INDEX idx_source 	ON ##TMP_T_LOAN (tx_data_source)
		CREATE INDEX idx_state		ON ##TMP_T_LOAN (tx_state_name)


		UPDATE ##TMP_T_LOAN
		SET tx_state_name 	= 'UH_APPROVED_0'
		WHERE tx_state_name = 'UH_APPROVED' AND int_in_group = 0

		UPDATE ##TMP_T_LOAN
		SET tx_state_name 	= 'UH_APPROVED_1'
		WHERE tx_state_name = 'UH_APPROVED' AND int_in_group = 1


		UPDATE ##TMP_T_LOAN
		set tx_queue_name = Q.tx_queue_name
		FROM    ##TMP_T_LOAN      T
		JOIN    TMP_T_STATE_MAP Q ON Q.tx_state_name = T.tx_state_name


		-- TOTAL
		INSERT INTO ##T_LMS_REPORT (dt_create, ct_tot)
		SELECT dt_create, count(*)
		FROM ##TMP_T_LOAN
		GROUP BY dt_create
		ORDER BY dt_create


		-- Total : ct_eloan
		UPDATE  ##T_LMS_REPORT
		SET     ct_eloan = tot_loans
		FROM    ##T_LMS_REPORT R
		JOIN
		(
			SELECT dt_create, tot_loans = count(*)
			FROM ##TMP_T_LOAN
			WHERE tx_data_source IN ('MOBILE')
			GROUP BY dt_create

		) VT ON VT.dt_create = R.dt_create


		/* TODO_H : update code to pivot table rather than inddiviual updates */

		-- Total : ct_lms
		UPDATE  ##T_LMS_REPORT
		SET     ct_lms = tot_loans
		FROM    ##T_LMS_REPORT R
		JOIN
		(	
			SELECT dt_create, tot_loans = count(*)
			FROM ##TMP_T_LOAN
			WHERE tx_data_source IN ('?', 'WEB', 'FILE')
			GROUP BY dt_create

		) VT ON VT.dt_create = R.dt_create

		-- FO_Q
		UPDATE ##T_LMS_REPORT
		SET ct_fo_q = ct
		FROM ##T_LMS_REPORT R
		JOIN (
				SELECT dt_create, tx_queue_name, ct = count(*)
				FROM ##TMP_T_LOAN
				GROUP BY dt_create, tx_queue_name
			 ) V ON V.dt_create = R.dt_create
		WHERE V.tx_queue_name = 'FO_Q'

		-- SO_Q
		UPDATE ##T_LMS_REPORT
		SET ct_so_q = ct
		FROM ##T_LMS_REPORT R
		JOIN (
				SELECT dt_create, tx_queue_name, ct = count(*)
				FROM ##TMP_T_LOAN
				GROUP BY dt_create, tx_queue_name
			 ) V ON V.dt_create = R.dt_create
		WHERE V.tx_queue_name = 'SO_Q'


		-- PPC_Q
		UPDATE ##T_LMS_REPORT
		SET ct_ppc_q = ct
		FROM ##T_LMS_REPORT R
		JOIN (
				SELECT	dt_create, tx_queue_name, ct = count(*)
				FROM	##TMP_T_LOAN
				GROUP 	BY dt_create, tx_queue_name
			 ) V ON V.dt_create = R.dt_create
		WHERE V.tx_queue_name = 'PPC_Q'

		-- CRM_Q
		UPDATE ##T_LMS_REPORT
		SET ct_crm_q = ct
		FROM ##T_LMS_REPORT R
		JOIN (
				SELECT dt_create, tx_queue_name, ct = count(*)
				FROM ##TMP_T_LOAN
				GROUP BY dt_create, tx_queue_name
			 ) V ON V.dt_create = R.dt_create
		WHERE V.tx_queue_name = 'CRM_Q'

		-- CEO_Q
		UPDATE ##T_LMS_REPORT
		SET ct_ceo_q = ct
		FROM ##T_LMS_REPORT R
		JOIN (
				SELECT dt_create, tx_queue_name, ct = count(*)
				FROM ##TMP_T_LOAN
				GROUP BY dt_create, tx_queue_name
			 ) V ON V.dt_create = R.dt_create
		WHERE V.tx_queue_name = 'CEO_Q'

		-- CAD_Q
		UPDATE ##T_LMS_REPORT
		SET ct_cad_q = ct
		FROM ##T_LMS_REPORT R
		JOIN (
				SELECT dt_create, tx_queue_name, ct = count(*)
				FROM ##TMP_T_LOAN
				GROUP BY dt_create, tx_queue_name
			 ) V ON V.dt_create = R.dt_create
		WHERE V.tx_queue_name = 'CAD_Q'

		-- DEFFERED_Q
		UPDATE ##T_LMS_REPORT
		SET ct_deffered_q = ct
		FROM ##T_LMS_REPORT R
		JOIN (
				SELECT dt_create, tx_queue_name, ct = count(*)
				FROM ##TMP_T_LOAN
				GROUP BY dt_create, tx_queue_name
			 ) V ON V.dt_create = R.dt_create
		WHERE V.tx_queue_name = 'DEFFERED_Q'

		-- DISBURSED_Q
		UPDATE ##T_LMS_REPORT
		SET ct_disbursed_q = ct
		FROM ##T_LMS_REPORT R
		JOIN (
				SELECT dt_create, tx_queue_name, ct = count(*)
				FROM ##TMP_T_LOAN
				GROUP BY dt_create, tx_queue_name
			 ) V ON V.dt_create = R.dt_create
		WHERE V.tx_queue_name = 'DISBURSED_Q'


		-- DECLINED_Q
		UPDATE ##T_LMS_REPORT
		SET ct_declined_q = ct
		FROM ##T_LMS_REPORT R
		JOIN (
				SELECT dt_create, tx_queue_name, ct = count(*)
				FROM ##TMP_T_LOAN
				GROUP BY dt_create, tx_queue_name
			 ) V ON V.dt_create = R.dt_create
		WHERE V.tx_queue_name = 'DECLINED_Q'


		-- DELETED_Q
		UPDATE ##T_LMS_REPORT
		SET ct_deleted_q = ct
		FROM ##T_LMS_REPORT R
		JOIN (
				SELECT dt_create, tx_queue_name, ct = count(*)
				FROM ##TMP_T_LOAN
				GROUP BY dt_create, tx_queue_name
			 ) V ON V.dt_create = R.dt_create
		WHERE V.tx_queue_name = 'DELETED_Q'


		-- MISC_Q
		UPDATE ##T_LMS_REPORT
		SET ct_misc_q = ct
		FROM ##T_LMS_REPORT R
		JOIN (
				SELECT dt_create, tx_queue_name, ct = count(*)
				FROM ##TMP_T_LOAN
				GROUP BY dt_create, tx_queue_name
			 ) V ON V.dt_create = R.dt_create
		WHERE V.tx_queue_name = 'MISC_Q'


		--INSERT	INTO TMP_T_LOAN

		IF EXISTS (SELECT 1 FROM sys.tables WHERE name = 'TMP_T_LOAN')
		BEGIN
			DROP TABLE TMP_T_LOAN
		END

		SELECT 	*
		INTO	TMP_T_LOAN
		FROM 	##TMP_T_LOAN

		-- calc period
		DECLARE @l_dt_from DATE

		IF (@tx_period = 'ALL')
		BEGIN
			SET @l_dt_from = NULL
		END
		ELSE
		BEGIN
			SET @l_dt_from = DATEADD(day, -1 * CONVERT(int, @tx_period), GETDATE())
		END

		-- SELECT BY DATE
		SELECT	*
		FROM 	##T_LMS_REPORT
		WHERE	dt_create >= ISNULL(@l_dt_from, dt_create)

	END


	IF (@tx_report_name = 'RPT_STATUS_AGGREGATE')
	BEGIN
		-- SELECT SUM
		SELECT    dt_create		= GETDATE()
				, ct_tot			= SUM(ct_tot)
				, ct_eloan			= SUM(ct_eloan)
				, ct_lms			= SUM(ct_lms)
				, v_ct_tot			= SUM(v_ct_tot)
				, ct_fo_q			= SUM(ct_fo_q)
				, ct_so_q			= SUM(ct_so_q)
				, ct_ppc_q			= SUM(ct_ppc_q)
				, ct_crm_q			= SUM(ct_crm_q)
				, ct_ceo_q			= SUM(ct_ceo_q)
				, ct_cad_q			= SUM(ct_cad_q)
				, ct_deffered_q		= SUM(ct_deffered_q)
				, ct_disbursed_q	= SUM(ct_disbursed_q)
				, ct_declined_q		= SUM(ct_declined_q)
				, ct_deleted_q		= SUM(ct_deleted_q)
				, ct_misc_q			= SUM(ct_misc_q)
				, ct_q_tot			= SUM(ct_q_tot)
		FROM 	##T_LMS_REPORT
	END

	-- RPT_Q_STATUS_BY_ORIG_DATE
	IF (@tx_report_name = 'RPT_Q_STATUS_BY_ORIG_DATE')
	BEGIN

		-- RAISERROR('Running RPT_Q_STATUS_BY_ORIG_DATE', 0, 1) WITH NOWAIT

		SET @l_tmp_tx = 'Running RPT_Q_STATUS_BY_ORIG_DATE dt_create = [' + convert(varchar, @dt_create) + ']'

		INSERT INTO T_TMP_MSG_LOG VALUES(GETDATE(), @l_tmp_tx)

		DECLARE @l_tx_queue_name varchar(32)

		IF(@tx_queue_name LIKE 'ct%')
		BEGIN
			SELECT @l_tx_queue_name = UPPER(SUBSTRING(@tx_queue_name, 4, len(@tx_queue_name)))
		END
		ELSE
		BEGIN
			SELECT @l_tx_queue_name = @tx_queue_name
		END

		IF (@is_aggregate = 1)
		BEGIN
			SELECT 	  TMP.dt_create
			  		, L.id_loan_key
					, L.dtt_mod
					, L.dec_applied_loan_amount
					, L.dec_tenor_year
					, L.tx_application_no
					, TMP.tx_state_name
				

					, TMP.tx_queue_name
					, tx_orig_name = UPPER(LEFT(C.tx_first_name,1)) + LOWER(SUBSTRING(C.tx_first_name,2,LEN(C.tx_first_name))) +  ' ' + UPPER(LEFT(C.tx_last_name,1)) + LOWER(SUBSTRING(C.tx_last_name,2,LEN(C.tx_last_name)))
					, tx_orig_loc = L.tx_sourcing_brc
					, L.tx_account_no as loan_account
					, L.tx_loan_tracking_id
					, L.tx_data_source

					, CUST.tx_customer_id
					, CUST.tx_bp_no
					, CUST.tx_customer_name
					, CUST.tx_designation
					, CUST.tx_current_posting_place
					, CUST.tx_nid
					, CUST.tx_tin
					, CUST.tx_account_no as cust_account

			FROM 	TMP_T_LOAN TMP
			JOIN 	T_LOAN  L ON L.id_loan_key = TMP.id_loan_key
			JOIN    T_USER  C ON C.id_user_key = L.id_creator_key
			JOIN    T_CUSTOMER CUST ON CUST.id_customer_key = L.id_customer_key

			WHERE	TMP.tx_queue_name 	= @l_tx_queue_name
		END
		ELSE
		BEGIN
			SELECT 	  TMP.dt_create
			  		, L.id_loan_key
					, L.dtt_mod
					, L.dec_applied_loan_amount
					, L.dec_tenor_year
					, L.tx_application_no
					, TMP.tx_state_name

					, TMP.tx_queue_name
					, tx_orig_name = UPPER(LEFT(C.tx_first_name,1)) + LOWER(SUBSTRING(C.tx_first_name,2,LEN(C.tx_first_name))) +  ' ' + UPPER(LEFT(C.tx_last_name,1)) + LOWER(SUBSTRING(C.tx_last_name,2,LEN(C.tx_last_name)))
					, tx_orig_loc = L.tx_sourcing_brc
					, L.tx_account_no as loan_account
					, L.tx_loan_tracking_id
					, L.tx_data_source

					, CUST.tx_customer_id
					, CUST.tx_bp_no
					, CUST.tx_customer_name
					, CUST.tx_designation
					, CUST.tx_current_posting_place
					, CUST.tx_nid
					, CUST.tx_tin
					, CUST.tx_account_no as cust_account

			FROM 	TMP_T_LOAN TMP
			JOIN 	T_LOAN  L ON L.id_loan_key = TMP.id_loan_key
			JOIN    T_USER  C ON C.id_user_key = L.id_creator_key
			JOIN    T_CUSTOMER CUST ON CUST.id_customer_key = L.id_customer_key

			WHERE 	TMP.dt_create 		= CONVERT(DATE, @dt_create)
			AND		TMP.tx_queue_name 	= @l_tx_queue_name
		END

	END


END
 

