/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Kh. Assaduzzaman Sohan
* Date          : 03 JUNE 2019
* Description   : 
*****************************************************************************************/
#include <nSMART_SQL.h>

#define _SP_NAME        {ACT_lms_dashboard};
#define _TABLE_NAME     {T_LOAN_AUDIT};

_DROP_PROC

_CREATE_PROC (_SP_NAME)
    
    _SP_PARAM_HEADER
    _SP_PARAM_FOOTER

    , @dtt_from_date                            DATETIME                = NULL
    , @dtt_to_date                              DATETIME                = NULL

    , @tx_dept_name                             VARCHAR(64)             = NULL
    , @tx_date                                  VARCHAR(64)             = NULL

    , @tx_account_no                            VARCHAR(256)           = NULL
    , @tx_bp_no                                 VARCHAR(256)           = NULL
    , @tx_nid                                   VARCHAR(256)           = NULL
    , @tx_phone                                 VARCHAR(256)           = NULL
    , @tx_from_date                             VARCHAR(256)           = NULL
    , @tx_to_date                               VARCHAR(256)           = NULL
    , @tx_loan_tracking_id                      VARCHAR(32)            = NULL
    , @tx_application_no                        VARCHAR(256)           = NULL

    , @tx_customer_name                         VARCHAR(256)           = NULL
    , @tx_login_name                            VARCHAR(256)           = NULL
    , @tx_staff_id                             VARCHAR(256)           = NULL
    , @int_date_type                            INT                   = NULL   

AS

{
    _SP_HEADER

    IF (@dtt_from_date IS NULL)
    {
        SELECT @dtt_from_date = Dateadd(dd, -30, GETDATE())
        IF(@tx_from_date IS NULL)
        {
            SELECT @tx_from_date = CAST(@dtt_from_date AS DATE) 
        }
    }

    IF (@dtt_to_date IS NULL)
    {
        SELECT @dtt_to_date = GETDATE()
        IF(@tx_to_date IS NULL)
        {
            SELECT @tx_to_date = CAST(@dtt_to_date AS DATE)  
        }
    }

    IF ( @tx_action_name = 'ON_PROCESS_STATUS' )
    {
        SELECT DISTINCT CONVERT(DATE, L.dtt_mod) AS tx_date
        , U.tx_login_name AS tx_login_name
        , L.id_loan_key
        , L.id_user_mod_key
        INTO #TEMP_ON_PROCESS_STATUS 
        FROM T_LOAN_AUDIT L WITH (NOLOCK)
        JOIN T_USER U ON U.id_user_key = L.id_user_mod_key
        JOIN T_CUSTOMER C   ON C.id_customer_key    = L.id_customer_key 
        WHERE L.id_state_key in
        (
            SELECT id_fsm_state_key FROM T_FSM_STATE
            WHERE tx_state_name IN ('MIS_ALLOCATED','MIS_RE_ALLOCATED','CA_CONDITION_FULFILLED','CA_RECOMMENDED','CA_RETURNED','CA_SENT_QUERY','CA_UPDATED','RM_RECOMMENDED','RM_RETURNED','UH_RECOMMENDED','UH_RETURNED','HOCRM_RECOMMENDED','HOCRM_RETURNED','MD_RETURNED','CEO_RETURNED')
        )
        AND L.is_active = 1
        AND L.dtt_mod >= ISNULL(@dtt_from_date  ,L.dtt_mod) 
        AND L.dtt_mod <= ISNULL(@dtt_to_date    ,L.dtt_mod)
        AND L.tx_account_no          = ISNULL(@tx_account_no                 ,L.tx_account_no)
        AND C.tx_nid                    = ISNULL(@tx_nid                        ,C.tx_nid)
        AND C.tx_bp_no                  = ISNULL(@tx_bp_no                      ,C.tx_bp_no)
        AND L.tx_loan_tracking_id       = ISNULL(@tx_loan_tracking_id           ,L.tx_loan_tracking_id)
        ORDER BY U.tx_login_name ASC

        SELECT  tx_rs_type = 'RS_TYPE_DATA'
        , tx_date
        , tx_login_name
        FROM #TEMP_ON_PROCESS_STATUS L WITH (NOLOCK)

        SELECT DISTINCT tx_rs_type = 'RS_TYPE_USER_LIST'
        , id_user_mod_key
        , tx_login_name
        FROM #TEMP_ON_PROCESS_STATUS WITH (NOLOCK)
        ORDER BY tx_login_name ASC
 
        SELECT DISTINCT tx_rs_type = 'RS_TYPE_DATE_LIST'
        , tx_date
        FROM #TEMP_ON_PROCESS_STATUS WITH (NOLOCK)
        ORDER BY tx_date ASC
    }
    IF(@tx_action_name = 'PPC_ON_PROCESS_STATUS')
    {
        SELECT DISTINCT CONVERT(DATE, L.dtt_mod) AS tx_date
        , U.tx_login_name AS tx_login_name
        , L.id_loan_key
        , L.id_user_mod_key
        INTO #TEMP_PPC_ON_PROCESS_STATUS 
        FROM T_LOAN_AUDIT L WITH (NOLOCK)
        JOIN T_USER U ON U.id_user_key = L.id_user_mod_key
        JOIN T_CUSTOMER C   ON C.id_customer_key    = L.id_customer_key
        WHERE L.id_state_key in
        (
            SELECT id_fsm_state_key FROM T_FSM_STATE
            WHERE tx_state_name IN ('FO_UPDATED','FO_SUBMITTED','FO_CREATED','FO_DELETED','SO_CREATED','SO_UPDATED',
            'SO_RECOMMENDED','SO_RE_RECOMMENDED','SO_DELETED','BM_RECOMMENDED','BM_RETURNED','BOM_RECOMMENDED',
            'BOM_RETURNED','PPC_RECOMMENDED','PPC_RETURNED')
        )
        AND L.is_active = 1
        AND L.dtt_mod      >= ISNULL(CAST(@tx_from_date AS DATE)  ,L.dtt_mod)
        AND CAST(L.dtt_mod AS DATE) <= ISNULL(CAST(@tx_to_date  AS DATE)  ,L.dtt_mod) 
        AND U.tx_login_name          = ISNULL(@tx_login_name         ,U.tx_login_name)  
        AND L.tx_staff_id          = ISNULL(@tx_staff_id         ,L.tx_staff_id)
        AND L.tx_account_no          = ISNULL(@tx_account_no                    ,L.tx_account_no)
        AND C.tx_nid                    = ISNULL(@tx_nid                        ,C.tx_nid)
        AND C.tx_bp_no                  = ISNULL(@tx_bp_no                      ,C.tx_bp_no)
        AND L.tx_loan_tracking_id       = ISNULL(@tx_loan_tracking_id           ,L.tx_loan_tracking_id)    
        ORDER BY U.tx_login_name ASC

        SELECT  tx_rs_type = 'RS_TYPE_DATA'
        , tx_date
        , tx_login_name
        FROM #TEMP_PPC_ON_PROCESS_STATUS L WITH (NOLOCK)

        SELECT DISTINCT tx_rs_type = 'RS_TYPE_USER_LIST'
        , id_user_mod_key
        , tx_login_name
        FROM #TEMP_PPC_ON_PROCESS_STATUS WITH (NOLOCK)
        ORDER BY tx_login_name ASC

        SELECT DISTINCT tx_rs_type = 'RS_TYPE_DATE_LIST'
        , tx_date
        FROM #TEMP_PPC_ON_PROCESS_STATUS WITH (NOLOCK)
        ORDER BY tx_date ASC
    }
   IF(@tx_action_name = 'SELECT_PPC_STATUS_WISE_DATA')
    {
        SELECT  DISTINCT ( CONVERT(DATE, L.dtt_mod)) AS dt_date,
        L.tx_loan_tracking_id
        , S.tx_display_text as tx_state_display_label
        , S.tx_state_name
        , L.id_state_key
        , L.id_loan_key
        , C.tx_customer_name
        , L.tx_account_no
        , C.tx_bp_no 
        , L.dtt_create
       , L.dtt_mod
        , L.dec_applied_loan_amount    
        , L.is_active
        , L.tx_data_source
        INTO #TEMP_LOAN_PPC_STATUS_WISE_DATA
        FROM T_LOAN_AUDIT L
        JOIN T_FSM_STATE S ON L.id_state_key = S.id_fsm_state_key
        JOIN T_CUSTOMER C ON C.id_customer_key = L.id_customer_key 
        JOIN T_FSM_TYPE T ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
        JOIN T_USER U ON U.id_user_key = L.id_user_mod_key
        WHERE  L.id_state_key in
        (
            SELECT id_fsm_state_key FROM T_FSM_STATE
            WHERE tx_state_name IN ('FO_UPDATED','FO_SUBMITTED','FO_CREATED','FO_DELETED','SO_CREATED','SO_UPDATED',
            'SO_RECOMMENDED','SO_RE_RECOMMENDED','SO_DELETED','BM_RECOMMENDED','BM_RETURNED','BOM_RECOMMENDED',
            'BOM_RETURNED','PPC_RECOMMENDED','PPC_RETURNED')
        )
        AND U.tx_login_name=@tx_login_name
        AND L.is_active = 1
        AND L.dtt_mod      >= ISNULL(CAST(@tx_from_date AS DATE)  ,L.dtt_mod)
        AND CAST(L.dtt_mod AS DATE) <= ISNULL(CAST(@tx_to_date  AS DATE)  ,L.dtt_mod)


        SELECT tx_loan_tracking_id,CAST(dtt_mod as date) as dt_date,max(dtt_mod) as dtt_max_date
        into #TEMP_DATA
        from #TEMP_LOAN_PPC_STATUS_WISE_DATA PD 
        group by tx_loan_tracking_id, CAST(dtt_mod as date)

        SELECT tx_rs_type = 'RS_TYPE_PPC_STATUS_WISE_DATA',l.* 
        FROM #TEMP_DATA D
        JOIN #TEMP_LOAN_PPC_STATUS_WISE_DATA L ON l.tx_loan_tracking_id = d.tx_loan_tracking_id and l.dtt_mod = d.dtt_max_date
    }
    IF ( @tx_action_name = 'FILE_RECEIVED_STATUS' )
    {
        SELECT DISTINCT CONVERT(DATE, L.dtt_mod) AS tx_date
        , U.tx_login_name AS tx_login_name
        , L.id_loan_key
        , L.id_user_mod_key
        INTO #TEMP_FILE_RECEIVED_STATUS
        FROM T_LOAN_AUDIT L WITH (NOLOCK)
        JOIN T_USER U ON U.id_user_key = L.id_user_mod_key
        JOIN T_CUSTOMER C   ON C.id_customer_key    = L.id_customer_key
        WHERE L.id_state_key in
        (
            SELECT id_fsm_state_key FROM T_FSM_STATE
            WHERE tx_state_name IN ('MIS_RECEIVED', 'CA_RECEIVED')
        )
        AND L.is_active = 1
        AND L.dtt_mod >= ISNULL(@dtt_from_date  ,L.dtt_mod) 
        AND L.dtt_mod <= ISNULL(@dtt_to_date    ,L.dtt_mod)
        AND L.tx_account_no          = ISNULL(@tx_account_no                    ,L.tx_account_no)
        AND C.tx_nid                    = ISNULL(@tx_nid                        ,C.tx_nid)
        AND C.tx_bp_no                  = ISNULL(@tx_bp_no                      ,C.tx_bp_no)
        AND L.tx_loan_tracking_id       = ISNULL(@tx_loan_tracking_id           ,L.tx_loan_tracking_id)
        ORDER BY L.id_user_mod_key ASC

        SELECT tx_rs_type = 'RS_TYPE_DATA'
        , tx_date
        , tx_login_name
        FROM #TEMP_FILE_RECEIVED_STATUS WITH (NOLOCK)

        SELECT DISTINCT tx_rs_type = 'RS_TYPE_USER_LIST'
        , id_user_mod_key
        , tx_login_name
        FROM #TEMP_FILE_RECEIVED_STATUS WITH (NOLOCK)
        ORDER BY tx_login_name ASC
        
        SELECT DISTINCT tx_rs_type = 'RS_TYPE_DATE_LIST'
        , tx_date
        FROM #TEMP_FILE_RECEIVED_STATUS WITH (NOLOCK)
        ORDER BY tx_date ASC
    }

    IF ( @tx_action_name = 'STATUS_WISE_COUNT' )
    {
        SELECT DISTINCT CONVERT(DATE, L.dtt_mod) AS tx_date
        , S.tx_status_name AS tx_login_name
        , L.id_loan_key
        INTO #TEMP_STATUS_WISE_COUNT
        FROM T_LOAN_AUDIT L WITH (NOLOCK)
        JOIN T_STATE_STATUS_MAP S ON L.id_state_key = S.id_fsm_state_key
        WHERE L.is_active = 1
        AND L.dtt_mod >= ISNULL(@dtt_from_date  ,L.dtt_mod) 
        AND L.dtt_mod <= ISNULL(@dtt_to_date    ,L.dtt_mod)

        SELECT tx_rs_type = 'RS_TYPE_DATA'
        , tx_date
        , tx_login_name
        FROM #TEMP_STATUS_WISE_COUNT L WITH (NOLOCK)
        ORDER BY tx_login_name ASC

        SELECT DISTINCT tx_rs_type = 'RS_TYPE_USER_LIST'
        , tx_status_name AS tx_login_name
        , int_order_number
        FROM T_STATE_STATUS_MAP WITH (NOLOCK)
        WHERE is_active = 1
        ORDER BY int_order_number ASC

        SELECT DISTINCT tx_rs_type = 'RS_TYPE_DATE_LIST'
        , tx_date
        FROM #TEMP_STATUS_WISE_COUNT L WITH (NOLOCK)
        ORDER BY tx_date ASC
    }

    IF ( @tx_action_name = 'STATUS_WISE_COUNT_LATEST' )
    {
        SELECT L.*, S.tx_state_name
        INTO #TEMPPP_LOAN
        FROM T_LOAN_AUDIT L
        JOIN T_FSM_STATE S ON L.id_state_key = S.id_fsm_state_key
        JOIN T_FSM_TYPE T ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
        JOIN T_CUSTOMER C   ON C.id_customer_key    = L.id_customer_key
        WHERE L.is_active = 1
        AND CAST(L.dtt_mod AS DATE)  >= CAST(@tx_from_date AS DATE)
        AND CAST(L.dtt_mod AS DATE)  <= CAST(@tx_to_date AS DATE)
        AND L.tx_account_no          = ISNULL(@tx_account_no                    ,L.tx_account_no)
        AND C.tx_nid                    = ISNULL(@tx_nid                        ,C.tx_nid)
        AND C.tx_bp_no                  = ISNULL(@tx_bp_no                      ,C.tx_bp_no)
        AND L.tx_loan_tracking_id       = ISNULL(@tx_loan_tracking_id           ,L.tx_loan_tracking_id)

        SELECT DISTINCT CAST(L.dtt_mod AS DATE) AS tx_date
        ,0 AS new_entry
        ,0 AS pending_recom_ppc
        ,0 AS recom_by_ppc
        ,0 AS receive_by_crm
        ,0 AS complete
        ,0 AS con_approved
        ,0 AS on_process
        ,0 AS pending
        ,0 AS sl_generated
        ,0 AS md_approved
        ,0 AS reject_or_declien
        INTO #TEMP_STATUS_WISE_LOAN
        FROM #TEMPPP_LOAN L
        ORDER BY CAST(L.dtt_mod AS DATE) ASC

        SELECT D.tx_date, COUNT(DISTINCT L.id_loan_key) AS int_count
        INTO #TEMP_NEW_ENTRY
        FROM #TEMP_STATUS_WISE_LOAN D
        JOIN #TEMPPP_LOAN L ON CAST(L.dtt_mod AS DATE) = D.tx_date
        WHERE L.tx_state_name IN ( 'FO_SUBMITTED','SO_UPDATED' )
        GROUP BY D.tx_date

        SELECT D.tx_date, COUNT(DISTINCT L.id_loan_key) AS int_count
        INTO #TEMP_PENDING_RECOM_PPC
        FROM #TEMP_STATUS_WISE_LOAN D
        JOIN #TEMPPP_LOAN L ON CAST(L.dtt_mod AS DATE) = D.tx_date
        WHERE L.tx_state_name IN ( 'SO_RECOMMENDED','SO_RE_RECOMMENDED' )
        GROUP BY D.tx_date

        SELECT D.tx_date, COUNT(DISTINCT L.id_loan_key) AS int_count
        INTO #TEMP_RECOM_BY_PPC
        FROM #TEMP_STATUS_WISE_LOAN D
        JOIN #TEMPPP_LOAN L ON CAST(L.dtt_mod AS DATE) = D.tx_date
        WHERE L.tx_state_name IN ( 'PEND_RECEIVED')
        GROUP BY D.tx_date

        SELECT D.tx_date, COUNT(DISTINCT L.id_loan_key) AS int_count
        INTO #TEMP_RECEIVE_BY_CRM
        FROM #TEMP_STATUS_WISE_LOAN D
        JOIN #TEMPPP_LOAN L ON CAST(L.dtt_mod AS DATE) = D.tx_date
        WHERE L.tx_state_name IN ( 'MIS_RECEIVED','CA_RECEIVED' )
        GROUP BY D.tx_date

        SELECT D.tx_date, COUNT(DISTINCT L.id_loan_key) AS int_count
        INTO #TEMP_COMPLETE
        FROM #TEMP_STATUS_WISE_LOAN D
        JOIN #TEMPPP_LOAN L ON CAST(L.dtt_mod AS DATE) = D.tx_date
        WHERE L.tx_state_name IN ( 'CEO_APPROVED','HOCRM_APPROVED','RM_APPROVED','UH_APPROVED','MD_APPROVED')
        GROUP BY D.tx_date

        SELECT D.tx_date, COUNT(DISTINCT L.id_loan_key) AS int_count
        INTO #TEMP_CON_APPROVED
        FROM #TEMP_STATUS_WISE_LOAN D
        JOIN #TEMPPP_LOAN L ON CAST(L.dtt_mod AS DATE) = D.tx_date
        WHERE L.tx_state_name IN ( 'CEO_C_APPROVED','HOCRM_C_APPROVED','MD_C_APPROVED','RM_C_APPROVED','UH_C_APPROVED')
        GROUP BY D.tx_date

        SELECT D.tx_date, COUNT(DISTINCT L.id_loan_key) AS int_count
        INTO #TEMP_ON_PROCESS
        FROM #TEMP_STATUS_WISE_LOAN D
        JOIN #TEMPPP_LOAN L ON CAST(L.dtt_mod AS DATE) = D.tx_date
        WHERE L.tx_state_name IN ( 'CA_RECOMMENDED','CA_RETURNED','CA_SENT_QUERY','CA_UPDATED','CEO_RETURNED','HOCRM_RECOMMENDED','HOCRM_RETURNED','MD_RETURNED','MIS_ALLOCATED','MIS_RE_ALLOCATED','RM_RECOMMENDED','RM_RETURNED','UH_RECOMMENDED','UH_RETURNED' )
        GROUP BY D.tx_date

        SELECT D.tx_date, COUNT(DISTINCT L.id_loan_key) AS int_count
        INTO #TEMP_PENDING
        FROM #TEMP_STATUS_WISE_LOAN D
        JOIN #TEMPPP_LOAN L ON CAST(L.dtt_mod AS DATE) = D.tx_date
        WHERE L.tx_state_name IN ( 'CEO_DEFERED','HOCRM_DEFERED','MD_DEFERED','RM_DEFERED','UH_DEFERED' )
        GROUP BY D.tx_date

        SELECT D.tx_date, COUNT(DISTINCT L.id_loan_key) AS int_count
        INTO #TEMP_SL_GENERATED
        FROM #TEMP_STATUS_WISE_LOAN D
        JOIN #TEMPPP_LOAN L ON CAST(L.dtt_mod AS DATE) = D.tx_date
        WHERE L.tx_state_name IN ( 'SL_GENERATED')
        GROUP BY D.tx_date

        SELECT D.tx_date, COUNT(DISTINCT L.id_loan_key) AS int_count
        INTO #TEMP_MD_APPROVED1
        FROM #TEMP_STATUS_WISE_LOAN D
        JOIN #TEMPPP_LOAN L ON CAST(L.dtt_mod AS DATE) = D.tx_date
        WHERE L.tx_state_name IN ('SENT_TO_CAD')
        GROUP BY D.tx_date

        SELECT D.tx_date, COUNT(DISTINCT L.id_loan_key) AS int_count
        INTO #TEMP_REJECT_OR_DECLINE
        FROM #TEMP_STATUS_WISE_LOAN D
        JOIN #TEMPPP_LOAN L ON CAST(L.dtt_mod AS DATE) = D.tx_date
        WHERE L.tx_state_name IN ( 'REJECTED','RM_DECLINED','UH_DECLINED','HOCRM_DECLINED','CEO_DECLINED','MD_DECLINED')
        GROUP BY D.tx_date

        UPDATE D
        SET D.new_entry = ( ISNULL((SELECT int_count FROM #TEMP_NEW_ENTRY TL WHERE TL.tx_date = D.tx_date), 0) )
        , D.pending_recom_ppc = ( ISNULL((SELECT int_count FROM #TEMP_PENDING_RECOM_PPC TL WHERE TL.tx_date = D.tx_date), 0) )
        , D.recom_by_ppc = ( ISNULL((SELECT int_count FROM #TEMP_RECOM_BY_PPC TL WHERE TL.tx_date = D.tx_date), 0) )
        , D.receive_by_crm = ( ISNULL((SELECT int_count FROM #TEMP_RECEIVE_BY_CRM TL WHERE TL.tx_date = D.tx_date), 0) )
        , D.complete = ( ISNULL((SELECT int_count FROM #TEMP_COMPLETE TL WHERE TL.tx_date = D.tx_date), 0) )
        , D.con_approved = ( ISNULL((SELECT int_count FROM #TEMP_CON_APPROVED TL WHERE TL.tx_date = D.tx_date), 0) )
        , D.on_process = ( ISNULL((SELECT int_count FROM #TEMP_ON_PROCESS TL WHERE TL.tx_date = D.tx_date), 0) )
        , D.pending = ( ISNULL((SELECT int_count FROM #TEMP_PENDING TL WHERE TL.tx_date = D.tx_date), 0) )
        , D.sl_generated = ( ISNULL((SELECT int_count FROM #TEMP_SL_GENERATED TL WHERE TL.tx_date = D.tx_date), 0) )
        , D.md_approved = ( ISNULL((SELECT int_count FROM #TEMP_MD_APPROVED1 TL WHERE TL.tx_date = D.tx_date), 0) )
        , D.reject_or_declien = ( ISNULL((SELECT int_count FROM #TEMP_REJECT_OR_DECLINE TL WHERE TL.tx_date = D.tx_date), 0) )        
        FROM #TEMP_STATUS_WISE_LOAN D

        SELECT tx_rs_type = 'RS_TYPE_DASHBOARD_DATA', * 
        FROM #TEMP_STATUS_WISE_LOAN
    }

    IF ( @tx_action_name = 'DEPARTMENT_WISE_COUNT' )
    { 
        SELECT DISTINCT CONVERT(DATE, L.dtt_mod) AS tx_date
        , D.tx_dept_name AS tx_login_name
        , L.id_loan_key
        , L.id_user_mod_key
        , D.int_order_number
        INTO #TEMP_DEPARTMENT_WISE_COUNT
        FROM T_LOAN_AUDIT L WITH (NOLOCK)
        JOIN T_USER U ON U.id_user_key = L.id_user_mod_key
        JOIN T_DEPARTMENT D ON D.id_dept_key = U.id_dept_key
        JOIN T_CUSTOMER C ON C.id_customer_key = L.id_customer_key
        WHERE L.is_active = 1
        AND C.tx_customer_name = ISNULL(@tx_customer_name  ,C.tx_customer_name)
        AND C.is_active = 1
        AND L.dtt_mod >= ISNULL(@dtt_from_date  ,L.dtt_mod) 
        AND L.dtt_mod <= ISNULL(@dtt_to_date    ,L.dtt_mod)
        ORDER BY L.id_user_mod_key ASC

        SELECT tx_rs_type = 'RS_TYPE_DATA'
        , tx_date
        , tx_login_name
        FROM #TEMP_DEPARTMENT_WISE_COUNT L WITH (NOLOCK)

        SELECT DISTINCT tx_rs_type = 'RS_TYPE_USER_LIST'
        , tx_login_name
        , int_order_number
        FROM #TEMP_DEPARTMENT_WISE_COUNT WITH (NOLOCK) 
        ORDER BY int_order_number ASC
        
        SELECT DISTINCT tx_rs_type = 'RS_TYPE_DATE_LIST'
        , tx_date
        FROM #TEMP_DEPARTMENT_WISE_COUNT WITH (NOLOCK)
        ORDER BY tx_date ASC
    }

    IF ( @tx_action_name = 'SELECT_LOAN_FOR_DEPT_BY_DATE' )
    {
        SELECT DISTINCT tx_rs_type = 'RS_TYPE_DATA', 
        L.*
        , C.*
        , S.tx_state_name
        , S.tx_display_text as tx_state_display_label
        FROM T_LOAN_AUDIT L WITH (NOLOCK)
        JOIN T_CUSTOMER C ON C.id_customer_key = L.id_customer_key 
        JOIN T_FSM_STATE S ON L.id_state_key = S.id_fsm_state_key
        JOIN T_FSM_TYPE T ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
        JOIN T_USER U ON U.id_user_key = L.id_user_mod_key
        JOIN T_DEPARTMENT D ON D.id_dept_key = U.id_dept_key
        WHERE CAST(L.dtt_mod AS DATE) >= ISNULL(CAST(@tx_from_date AS DATE)  ,L.dtt_mod)
        AND CAST(L.dtt_mod AS DATE)  <= ISNULL(CAST(@tx_to_date AS DATE)     ,L.dtt_mod)
        AND D.tx_dept_name = ISNULL(@tx_dept_name, D.tx_dept_name)
        AND L.is_active = 1
        ORDER BY S.tx_display_text ASC
    }

    IF ( @tx_action_name = 'SEARCH_LOAN_FOR_DASHBOARD_VIEW' )
    {
        SELECT tx_rs_type = 'RS_TYPE_DATA'
        , L.*
        , C.*        
        , S.tx_state_name
        , S.tx_display_text as tx_state_display_label
        , T.tx_fsm_type_name
        FROM T_LOAN L
        JOIN T_FSM_STATE S ON L.id_state_key = S.id_fsm_state_key
        JOIN T_FSM_TYPE T ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
        JOIN T_CUSTOMER C ON C.id_customer_key = L.id_customer_key 
        WHERE L.tx_account_no            = ISNULL(@tx_account_no                ,L.tx_account_no)
        AND C.tx_bp_no                   = ISNULL(@tx_bp_no                     ,C.tx_bp_no)
        AND C.tx_nid                     = ISNULL(@tx_nid                       ,C.tx_nid)
        AND C.tx_mobile                  = ISNULL(@tx_phone                     ,C.tx_mobile)
        AND L.tx_loan_tracking_id        = ISNULL(@tx_loan_tracking_id          ,L.tx_loan_tracking_id)
        AND L.dtt_create                >= ISNULL(CAST(@tx_from_date AS DATE)   ,L.dtt_create)
        AND CAST(L.dtt_create AS DATE)  <= ISNULL(CAST(@tx_to_date AS DATE)     ,L.dtt_create)
        AND L.tx_application_no          = ISNULL(@tx_application_no            ,L.tx_application_no)
        AND L.is_active     = 1
        ORDER BY L.id_loan_key DESC
    }

    IF ( @tx_action_name = 'DASHBOARD_STATUS' )
    {
        
        SELECT tx_rs_type = 'RS_TYPE_DATA'
        ,(
            SELECT COUNT(1) FROM T_LOAN
            WHERE is_active = 1
        ) AS dec_total_request
        ,(
            SELECT COUNT(1) FROM T_LOAN L
            JOIN T_FSM_STATE S ON L.id_state_key = S.id_fsm_state_key
            JOIN T_FSM_TYPE T ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
            WHERE L.is_active = 1 
            AND (S.tx_state_name LIKE '%APPROVED' or S.tx_state_name IN('SENT_TO_CAD', 'SL_GENERATED','CAD_DISBURSED'))
            AND S.tx_state_name NOT LIKE '%_C_APPROVED'
        ) AS dec_total_completed
        ,(
            SELECT COUNT(1) FROM T_LOAN L
            JOIN T_FSM_STATE S ON L.id_state_key = S.id_fsm_state_key
            JOIN T_FSM_TYPE T ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
            WHERE L.is_active = 1

            AND (S.tx_state_name NOT LIKE '%APPROVED' AND S.tx_state_name NOT LIKE ('%SENT_TO_CAD') AND S.tx_state_name NOT LIKE('%SL_GENERATED') AND S.tx_state_name NOT LIKE('%CAD_DISBURSED') or S.tx_state_name LIKE '%_C_APPROVED')
         ) AS dec_pend_received
    }

    IF ( @tx_action_name = 'LOAN_STATUS_DATE_WISE')
    {
        SELECT L.*, S.tx_state_name
        INTO #TEMP_LOAN
        FROM T_LOAN_AUDIT L
        JOIN T_FSM_STATE S ON L.id_state_key = S.id_fsm_state_key
        JOIN T_FSM_TYPE T ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
        JOIN T_CUSTOMER C   ON C.id_customer_key    = L.id_customer_key 
        WHERE L.is_active = 1
        AND CAST(L.dtt_create AS DATE)  >= CAST(@tx_from_date AS DATE)
        AND CAST(L.dtt_create AS DATE)  <= CAST(@tx_to_date AS DATE)
        AND L.tx_account_no          = ISNULL(@tx_account_no                 ,L.tx_account_no)
        AND C.tx_nid                    = ISNULL(@tx_nid                        ,C.tx_nid)
        AND C.tx_bp_no                  = ISNULL(@tx_bp_no                      ,C.tx_bp_no)
        AND L.tx_loan_tracking_id       = ISNULL(@tx_loan_tracking_id           ,L.tx_loan_tracking_id)

        SELECT DISTINCT CAST(L.dtt_create AS DATE) AS tx_date
        ,0 AS entry_e_loan
        ,0 AS entry_web
        ,0 AS ppc_received
        ,0 AS ppc_rejcet_pending
        ,0 AS ppc_recommend
        ,0 AS crm_received
        ,0 AS crm_rejcet_pending
        ,0 AS crm_approved
        ,0 AS md_approved
        ,0 AS cad_sanction
        ,0 AS cad_disbursed
        INTO #TEMP_LOAN_FOR_DASHBOARD
        FROM #TEMP_LOAN L
        ORDER BY CAST(L.dtt_create AS DATE) ASC

        SELECT D.tx_date, COUNT(DISTINCT L.id_loan_key) AS int_count
        INTO #TEMP_ENTRY_E_LOAN
        FROM #TEMP_LOAN_FOR_DASHBOARD D
        JOIN #TEMP_LOAN L ON CAST(L.dtt_create AS DATE) = D.tx_date AND CAST(L.dtt_create AS DATE) = D.tx_date
        WHERE L.tx_state_name = 'FO_SUBMITTED' 
        AND L.tx_data_source = 'MOBILE'
        GROUP BY D.tx_date

        SELECT D.tx_date, COUNT(DISTINCT L.id_loan_key) AS int_count
        INTO #TEMP_ENTRY_WEB
        FROM #TEMP_LOAN_FOR_DASHBOARD D
        JOIN #TEMP_LOAN L ON CAST(L.dtt_create AS DATE) = D.tx_date AND CAST(L.dtt_create AS DATE) = D.tx_date
        WHERE L.tx_state_name = 'FO_SUBMITTED' 
        AND L.tx_data_source = 'WEB'
        GROUP BY D.tx_date

        SELECT D.tx_date, COUNT(DISTINCT L.id_loan_key) AS int_count
        INTO #TEMP_PPC_RECEIVED
        FROM #TEMP_LOAN_FOR_DASHBOARD D
        JOIN #TEMP_LOAN L ON CAST(L.dtt_create AS DATE) = D.tx_date AND CAST(L.dtt_create AS DATE) = D.tx_date
        WHERE L.tx_state_name IN ('SO_RECOMMENDED', 'SO_RE_RECOMMENDED')
        GROUP BY D.tx_date

        SELECT D.tx_date, COUNT(DISTINCT L.id_loan_key) AS int_count
        INTO #TEMP_PPC_REJCET_PENDING
        FROM #TEMP_LOAN_FOR_DASHBOARD D
        JOIN #TEMP_LOAN L ON CAST(L.dtt_create AS DATE) = D.tx_date AND CAST(L.dtt_create AS DATE) = D.tx_date
        WHERE L.tx_state_name IN ('PPC_RETURNED')
        GROUP BY D.tx_date

        SELECT D.tx_date, COUNT(DISTINCT L.id_loan_key) AS int_count
        INTO #TEMP_PPC_RECOMMEND
        FROM #TEMP_LOAN_FOR_DASHBOARD D
        JOIN #TEMP_LOAN L ON CAST(L.dtt_create AS DATE) = D.tx_date AND CAST(L.dtt_create AS DATE) = D.tx_date
        WHERE L.tx_state_name IN ('PEND_RECEIVED', 'CA_RECEIVED')
        GROUP BY D.tx_date

        SELECT D.tx_date, COUNT(DISTINCT L.id_loan_key) AS int_count
        INTO #TEMP_CRM_RECEIVED
        FROM #TEMP_LOAN_FOR_DASHBOARD D
        JOIN #TEMP_LOAN L ON CAST(L.dtt_create AS DATE) = D.tx_date AND CAST(L.dtt_create AS DATE) = D.tx_date
        WHERE L.tx_state_name IN ('PEND_RECEIVED', 'CA_RECEIVED')
        GROUP BY D.tx_date

        SELECT D.tx_date, COUNT(DISTINCT L.id_loan_key) AS int_count
        INTO #TEMP_CRM_REJCET_PENDING
        FROM #TEMP_LOAN_FOR_DASHBOARD D
        JOIN #TEMP_LOAN L ON CAST(L.dtt_create AS DATE) = D.tx_date AND CAST(L.dtt_create AS DATE) = D.tx_date
        WHERE L.tx_state_name IN ('CA_RETURNED', 'CEO_RETURNED', 'HOCRM_RETURNED', 'MD_RETURNED', 'MIS_RETURNED', 'RM_RETURNED', 'UH_RETURNED')
        GROUP BY D.tx_date

        SELECT D.tx_date, COUNT(DISTINCT L.id_loan_key) AS int_count
        INTO #TEMP_CRM_APPROVED
        FROM #TEMP_LOAN_FOR_DASHBOARD D
        JOIN #TEMP_LOAN L ON CAST(L.dtt_create AS DATE) = D.tx_date AND CAST(L.dtt_create AS DATE) = D.tx_date
        WHERE L.tx_state_name LIKE '%APPROVED' AND L.tx_state_name NOT LIKE '%_C_APPROVED'
        GROUP BY D.tx_date

        SELECT D.tx_date, COUNT(DISTINCT L.id_loan_key) AS int_count
        INTO #TEMP_MD_APPROVED
        FROM #TEMP_LOAN_FOR_DASHBOARD D
        JOIN #TEMP_LOAN L ON CAST(L.dtt_create AS DATE) = D.tx_date AND CAST(L.dtt_create AS DATE) = D.tx_date
        WHERE L.tx_state_name IN ('SENT_TO_CAD')
        GROUP BY D.tx_date

        SELECT D.tx_date, COUNT(DISTINCT L.id_loan_key) AS int_count
        INTO #TEMP_CAD_SANCTION
        FROM #TEMP_LOAN_FOR_DASHBOARD D
        JOIN #TEMP_LOAN L ON CAST(L.dtt_create AS DATE) = D.tx_date AND CAST(L.dtt_create AS DATE) = D.tx_date
        WHERE L.tx_state_name IN ('SL_GENERATED')
        GROUP BY D.tx_date

        UPDATE D
        SET D.entry_e_loan = ( ISNULL((SELECT int_count FROM #TEMP_ENTRY_E_LOAN TL WHERE TL.tx_date = D.tx_date), 0) )
        , D.entry_web = ( ISNULL((SELECT int_count FROM #TEMP_ENTRY_WEB TL WHERE TL.tx_date = D.tx_date), 0) )
        , D.ppc_received = ( ISNULL((SELECT int_count FROM #TEMP_PPC_RECEIVED TL WHERE TL.tx_date = D.tx_date), 0) )
        , D.ppc_rejcet_pending = ( ISNULL((SELECT int_count FROM #TEMP_PPC_REJCET_PENDING TL WHERE TL.tx_date = D.tx_date), 0) )
        , D.ppc_recommend = ( ISNULL((SELECT int_count FROM #TEMP_PPC_RECOMMEND TL WHERE TL.tx_date = D.tx_date), 0) )
        , D.crm_received = ( ISNULL((SELECT int_count FROM #TEMP_CRM_RECEIVED TL WHERE TL.tx_date = D.tx_date), 0) )
        , D.crm_rejcet_pending = ( ISNULL((SELECT int_count FROM #TEMP_CRM_REJCET_PENDING TL WHERE TL.tx_date = D.tx_date), 0) )
        , D.crm_approved = ( ISNULL((SELECT int_count FROM #TEMP_CRM_APPROVED TL WHERE TL.tx_date = D.tx_date), 0) )
        , D.md_approved = ( ISNULL((SELECT int_count FROM #TEMP_MD_APPROVED TL WHERE TL.tx_date = D.tx_date), 0) )
        , D.cad_sanction = ( ISNULL((SELECT int_count FROM #TEMP_CAD_SANCTION TL WHERE TL.tx_date = D.tx_date), 0) )
        FROM #TEMP_LOAN_FOR_DASHBOARD D

        SELECT tx_rs_type = 'RS_TYPE_DASHBOARD_DATA', * 
        FROM #TEMP_LOAN_FOR_DASHBOARD
    }

    IF ( @tx_action_name = 'LOAN_STATUS_DEPT_WISE')
    {
       IF(@int_date_type =1)
    {
        SELECT L.*, S.tx_state_name
        INTO #TEMPP_LOAN
        FROM T_LOAN_AUDIT L
        JOIN T_FSM_STATE S ON L.id_state_key = S.id_fsm_state_key
        JOIN T_FSM_TYPE T ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
        JOIN T_CUSTOMER C   ON C.id_customer_key    = L.id_customer_key 
        WHERE L.is_active = 1
        AND CAST(L.dtt_mod AS DATE)  >= CAST(@tx_from_date AS DATE)
        AND CAST(L.dtt_mod AS DATE)  <= CAST(@tx_to_date AS DATE)
        AND L.tx_account_no          = ISNULL(@tx_account_no                 ,L.tx_account_no)
        AND C.tx_nid                    = ISNULL(@tx_nid                        ,C.tx_nid)
        AND C.tx_bp_no                  = ISNULL(@tx_bp_no                      ,C.tx_bp_no)
        AND L.tx_loan_tracking_id       = ISNULL(@tx_loan_tracking_id           ,L.tx_loan_tracking_id)

        SELECT DISTINCT CAST(L.dtt_mod AS DATE) AS tx_date
        ,0 AS entry_e_loan
        ,0 AS entry_web
        ,0 AS ppc_received
        ,0 AS ppc_rejcet_pending
        ,0 AS ppc_recommend
        ,0 AS crm_received
        ,0 AS crm_rejcet_pending
        ,0 AS crm_approved
        ,0 AS md_approved
        ,0 AS cad_sanction
        ,0 AS cad_disbursed
        INTO #TEMPP_LOAN_FOR_DASHBOARD
        FROM #TEMPP_LOAN L
        ORDER BY CAST(L.dtt_mod AS DATE) ASC

        SELECT D.tx_date, COUNT(DISTINCT L.id_loan_key) AS int_count
        INTO #TEMPP_ENTRY_E_LOAN
        FROM #TEMPP_LOAN_FOR_DASHBOARD D
        JOIN #TEMPP_LOAN L ON CAST(L.dtt_mod AS DATE) = D.tx_date
        WHERE L.tx_state_name = 'FO_SUBMITTED' 
        AND L.tx_data_source = 'MOBILE'
        GROUP BY D.tx_date

        SELECT D.tx_date, COUNT(DISTINCT L.id_loan_key) AS int_count
        INTO #TEMPP_ENTRY_WEB
        FROM #TEMPP_LOAN_FOR_DASHBOARD D
        JOIN #TEMPP_LOAN L ON CAST(L.dtt_mod AS DATE) = D.tx_date
        WHERE L.tx_state_name = 'FO_SUBMITTED' 
        AND L.tx_data_source = 'WEB'
        GROUP BY D.tx_date

        SELECT D.tx_date, COUNT(DISTINCT L.id_loan_key) AS int_count
        INTO #TEMPP_PPC_RECEIVED
        FROM #TEMPP_LOAN_FOR_DASHBOARD D
        JOIN #TEMPP_LOAN L ON CAST(L.dtt_mod AS DATE) = D.tx_date
        WHERE L.tx_state_name IN ('SO_RECOMMENDED', 'SO_RE_RECOMMENDED')
        GROUP BY D.tx_date

        SELECT D.tx_date, COUNT(DISTINCT L.id_loan_key) AS int_count
        INTO #TEMPP_PPC_REJCET_PENDING
        FROM #TEMPP_LOAN_FOR_DASHBOARD D
        JOIN #TEMPP_LOAN L ON CAST(L.dtt_mod AS DATE) = D.tx_date
        WHERE L.tx_state_name IN ('PPC_RETURNED')
        GROUP BY D.tx_date

        SELECT D.tx_date, COUNT(DISTINCT L.id_loan_key) AS int_count
        INTO #TEMPP_PPC_RECOMMEND
        FROM #TEMPP_LOAN_FOR_DASHBOARD D
        JOIN #TEMPP_LOAN L ON CAST(L.dtt_mod AS DATE) = D.tx_date
        WHERE L.tx_state_name IN ('PEND_RECEIVED')
        GROUP BY D.tx_date

        SELECT D.tx_date, COUNT(DISTINCT L.id_loan_key) AS int_count
        INTO #TEMPP_CRM_RECEIVED
        FROM #TEMPP_LOAN_FOR_DASHBOARD D
        JOIN #TEMPP_LOAN L ON CAST(L.dtt_mod AS DATE) = D.tx_date
        WHERE L.tx_state_name IN ('MIS_RECEIVED','CA_RECEIVED')
        GROUP BY D.tx_date

        SELECT D.tx_date, COUNT(DISTINCT L.id_loan_key) AS int_count
        INTO #TEMPP_CRM_REJCET_PENDING
        FROM #TEMPP_LOAN_FOR_DASHBOARD D
        JOIN #TEMPP_LOAN L ON CAST(L.dtt_mod AS DATE) = D.tx_date
        WHERE L.tx_state_name IN ('CA_RETURNED', 'CEO_RETURNED', 'HOCRM_RETURNED', 'MD_RETURNED', 'MIS_RETURNED', 'RM_RETURNED', 'UH_RETURNED')
        GROUP BY D.tx_date

        SELECT D.tx_date, COUNT(DISTINCT L.id_loan_key) AS int_count
        INTO #TEMPP_CRM_APPROVED
        FROM #TEMPP_LOAN_FOR_DASHBOARD D
        JOIN #TEMPP_LOAN L ON CAST(L.dtt_mod AS DATE) = D.tx_date
        WHERE L.tx_state_name LIKE '%APPROVED' AND L.tx_state_name NOT LIKE '%_C_APPROVED'
        GROUP BY D.tx_date

        SELECT D.tx_date, COUNT(DISTINCT L.id_loan_key) AS int_count
        INTO #TEMPP_MD_APPROVED
        FROM #TEMPP_LOAN_FOR_DASHBOARD D
        JOIN #TEMPP_LOAN L ON CAST(L.dtt_mod AS DATE) = D.tx_date
        WHERE L.tx_state_name IN ('SENT_TO_CAD')
        GROUP BY D.tx_date

        SELECT D.tx_date, COUNT(DISTINCT L.id_loan_key) AS int_count
        INTO #TEMPP_CAD_SANCTION
        FROM #TEMPP_LOAN_FOR_DASHBOARD D
        JOIN #TEMPP_LOAN L ON CAST(L.dtt_mod AS DATE) = D.tx_date
        WHERE L.tx_state_name IN ('SL_GENERATED')
        GROUP BY D.tx_date

        UPDATE D
        SET D.entry_e_loan = ( ISNULL((SELECT int_count FROM #TEMPP_ENTRY_E_LOAN TL WHERE TL.tx_date = D.tx_date), 0) )
        , D.entry_web = ( ISNULL((SELECT int_count FROM #TEMPP_ENTRY_WEB TL WHERE TL.tx_date = D.tx_date), 0) )
        , D.ppc_received = ( ISNULL((SELECT int_count FROM #TEMPP_PPC_RECEIVED TL WHERE TL.tx_date = D.tx_date), 0) )
        , D.ppc_rejcet_pending = ( ISNULL((SELECT int_count FROM #TEMPP_PPC_REJCET_PENDING TL WHERE TL.tx_date = D.tx_date), 0) )
        , D.ppc_recommend = ( ISNULL((SELECT int_count FROM #TEMPP_PPC_RECOMMEND TL WHERE TL.tx_date = D.tx_date), 0) )
        , D.crm_received = ( ISNULL((SELECT int_count FROM #TEMPP_CRM_RECEIVED TL WHERE TL.tx_date = D.tx_date), 0) )
        , D.crm_rejcet_pending = ( ISNULL((SELECT int_count FROM #TEMPP_CRM_REJCET_PENDING TL WHERE TL.tx_date = D.tx_date), 0) )
        , D.crm_approved = ( ISNULL((SELECT int_count FROM #TEMPP_CRM_APPROVED TL WHERE TL.tx_date = D.tx_date), 0) )
        , D.md_approved = ( ISNULL((SELECT int_count FROM #TEMPP_MD_APPROVED TL WHERE TL.tx_date = D.tx_date), 0) )
        , D.cad_sanction = ( ISNULL((SELECT int_count FROM #TEMPP_CAD_SANCTION TL WHERE TL.tx_date = D.tx_date), 0) )
        FROM #TEMPP_LOAN_FOR_DASHBOARD D

        SELECT tx_rs_type = 'RS_TYPE_DASHBOARD_DATA', * 
        FROM #TEMPP_LOAN_FOR_DASHBOARD
    }
    ELSE
    {
       SELECT L.*, S.tx_state_name
        INTO #TEMPP_LOAN1
        FROM T_LOAN_AUDIT L
        JOIN T_FSM_STATE S ON L.id_state_key = S.id_fsm_state_key
        JOIN T_FSM_TYPE T ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
        JOIN T_CUSTOMER C   ON C.id_customer_key    = L.id_customer_key 
        WHERE L.is_active = 1
        AND CAST(L.dtt_create AS DATE)  >= CAST(@tx_from_date AS DATE)
        AND CAST(L.dtt_create AS DATE)  <= CAST(@tx_to_date AS DATE)
        AND L.tx_account_no          = ISNULL(@tx_account_no                 ,L.tx_account_no)
        AND C.tx_nid                    = ISNULL(@tx_nid                        ,C.tx_nid)
        AND C.tx_bp_no                  = ISNULL(@tx_bp_no                      ,C.tx_bp_no)
        AND L.tx_loan_tracking_id       = ISNULL(@tx_loan_tracking_id           ,L.tx_loan_tracking_id)

        SELECT DISTINCT CAST(L.dtt_create AS DATE) AS tx_date
        ,0 AS entry_e_loan
        ,0 AS entry_web
        ,0 AS ppc_received
        ,0 AS ppc_rejcet_pending
        ,0 AS ppc_recommend
        ,0 AS crm_received
        ,0 AS crm_rejcet_pending
        ,0 AS crm_approved
        ,0 AS md_approved
        ,0 AS cad_sanction
        ,0 AS cad_disbursed
        INTO #TEMPP_LOAN_FOR_DASHBOARD1
        FROM #TEMPP_LOAN1 L
        ORDER BY CAST(L.dtt_create AS DATE) ASC

        SELECT D.tx_date, COUNT(DISTINCT L.id_loan_key) AS int_count
        INTO #TEMPP_ENTRY_E_LOAN1
        FROM #TEMPP_LOAN_FOR_DASHBOARD1 D
        JOIN #TEMPP_LOAN1 L ON CAST(L.dtt_create AS DATE) = D.tx_date
        WHERE L.tx_state_name = 'FO_SUBMITTED' 
        AND L.tx_data_source = 'MOBILE'
        GROUP BY D.tx_date

        SELECT D.tx_date, COUNT(DISTINCT L.id_loan_key) AS int_count
        INTO #TEMPP_ENTRY_WEB1
        FROM #TEMPP_LOAN_FOR_DASHBOARD1 D
        JOIN #TEMPP_LOAN1 L ON CAST(L.dtt_create AS DATE) = D.tx_date
        WHERE L.tx_state_name = 'FO_SUBMITTED' 
        AND L.tx_data_source = 'WEB'
        GROUP BY D.tx_date

        SELECT D.tx_date, COUNT(DISTINCT L.id_loan_key) AS int_count
        INTO #TEMPP_PPC_RECEIVED1
        FROM #TEMPP_LOAN_FOR_DASHBOARD1 D
        JOIN #TEMPP_LOAN1 L ON CAST(L.dtt_create AS DATE) = D.tx_date
        WHERE L.tx_state_name IN ('SO_RECOMMENDED', 'SO_RE_RECOMMENDED')
        GROUP BY D.tx_date

        SELECT D.tx_date, COUNT(DISTINCT L.id_loan_key) AS int_count
        INTO #TEMPP_PPC_REJCET_PENDING1
        FROM #TEMPP_LOAN_FOR_DASHBOARD1 D
        JOIN #TEMPP_LOAN1 L ON CAST(L.dtt_create AS DATE) = D.tx_date
        WHERE L.tx_state_name IN ('PPC_RETURNED')
        GROUP BY D.tx_date

        SELECT D.tx_date, COUNT(DISTINCT L.id_loan_key) AS int_count
        INTO #TEMPP_PPC_RECOMMEND1
        FROM #TEMPP_LOAN_FOR_DASHBOARD1 D
        JOIN #TEMPP_LOAN1 L ON CAST(L.dtt_create AS DATE) = D.tx_date
        WHERE L.tx_state_name IN ('PEND_RECEIVED')
        GROUP BY D.tx_date

        SELECT D.tx_date, COUNT(DISTINCT L.id_loan_key) AS int_count
        INTO #TEMPP_CRM_RECEIVED1
        FROM #TEMPP_LOAN_FOR_DASHBOARD1 D
        JOIN #TEMPP_LOAN1 L ON CAST(L.dtt_create AS DATE) = D.tx_date
        WHERE L.tx_state_name IN ('MIS_RECEIVED','CA_RECEIVED')
        GROUP BY D.tx_date

        SELECT D.tx_date, COUNT(DISTINCT L.id_loan_key) AS int_count
        INTO #TEMPP_CRM_REJCET_PENDING1
        FROM #TEMPP_LOAN_FOR_DASHBOARD1 D
        JOIN #TEMPP_LOAN1 L ON CAST(L.dtt_create AS DATE) = D.tx_date
        WHERE L.tx_state_name IN ('CA_RETURNED', 'CEO_RETURNED', 'HOCRM_RETURNED', 'MD_RETURNED', 'MIS_RETURNED', 'RM_RETURNED', 'UH_RETURNED')
        GROUP BY D.tx_date

        SELECT D.tx_date, COUNT(DISTINCT L.id_loan_key) AS int_count
        INTO #TEMPP_CRM_APPROVED1
        FROM #TEMPP_LOAN_FOR_DASHBOARD1 D
        JOIN #TEMPP_LOAN1 L ON CAST(L.dtt_create AS DATE) = D.tx_date
        WHERE L.tx_state_name LIKE '%APPROVED' AND L.tx_state_name NOT LIKE '%_C_APPROVED'
        GROUP BY D.tx_date

        SELECT D.tx_date, COUNT(DISTINCT L.id_loan_key) AS int_count
        INTO #TEMPP_MD_APPROVED1
        FROM #TEMPP_LOAN_FOR_DASHBOARD1 D
        JOIN #TEMPP_LOAN1 L ON CAST(L.dtt_create AS DATE) = D.tx_date
        WHERE L.tx_state_name IN ('SENT_TO_CAD')
        GROUP BY D.tx_date

        SELECT D.tx_date, COUNT(DISTINCT L.id_loan_key) AS int_count
        INTO #TEMPP_CAD_SANCTION1
        FROM #TEMPP_LOAN_FOR_DASHBOARD1 D
        JOIN #TEMPP_LOAN1 L ON CAST(L.dtt_create AS DATE) = D.tx_date
        WHERE L.tx_state_name IN ('SL_GENERATED')
        GROUP BY D.tx_date

        UPDATE D
        SET D.entry_e_loan = ( ISNULL((SELECT int_count FROM #TEMPP_ENTRY_E_LOAN1 TL WHERE TL.tx_date = D.tx_date), 0) )
        , D.entry_web = ( ISNULL((SELECT int_count FROM #TEMPP_ENTRY_WEB1 TL WHERE TL.tx_date = D.tx_date), 0) )
        , D.ppc_received = ( ISNULL((SELECT int_count FROM #TEMPP_PPC_RECEIVED1 TL WHERE TL.tx_date = D.tx_date), 0) )
        , D.ppc_rejcet_pending = ( ISNULL((SELECT int_count FROM #TEMPP_PPC_REJCET_PENDING1 TL WHERE TL.tx_date = D.tx_date), 0) )
        , D.ppc_recommend = ( ISNULL((SELECT int_count FROM #TEMPP_PPC_RECOMMEND1 TL WHERE TL.tx_date = D.tx_date), 0) )
        , D.crm_received = ( ISNULL((SELECT int_count FROM #TEMPP_CRM_RECEIVED1 TL WHERE TL.tx_date = D.tx_date), 0) )
        , D.crm_rejcet_pending = ( ISNULL((SELECT int_count FROM #TEMPP_CRM_REJCET_PENDING1 TL WHERE TL.tx_date = D.tx_date), 0) )
        , D.crm_approved = ( ISNULL((SELECT int_count FROM #TEMPP_CRM_APPROVED1 TL WHERE TL.tx_date = D.tx_date), 0) )
        , D.md_approved = ( ISNULL((SELECT int_count FROM #TEMPP_MD_APPROVED1 TL WHERE TL.tx_date = D.tx_date), 0) )
        , D.cad_sanction = ( ISNULL((SELECT int_count FROM #TEMPP_CAD_SANCTION1 TL WHERE TL.tx_date = D.tx_date), 0) )
        FROM #TEMPP_LOAN_FOR_DASHBOARD1 D

        SELECT tx_rs_type = 'RS_TYPE_DASHBOARD_DATA', * 
        FROM #TEMPP_LOAN_FOR_DASHBOARD1
    }
}

    IF ( @tx_action_name = 'LOAN_TRACKER_DEPT_WISE' OR @tx_action_name = 'SEARCH_LOAN_TRACKER_DEPT_WISE')
    {
        SELECT L.*, S.tx_state_name
        INTO #TEMP_LOAN_TRACKER
        FROM T_LOAN L
        JOIN T_FSM_STATE    S   ON L.id_state_key       = S.id_fsm_state_key
        JOIN T_FSM_TYPE     T   ON S.id_fsm_type_key    = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
        JOIN T_CUSTOMER     C   ON C.id_customer_key    = L.id_customer_key 
        WHERE  L.tx_account_no          = ISNULL(@tx_account_no                 ,L.tx_account_no)
        AND C.tx_nid                    = ISNULL(@tx_nid                        ,C.tx_nid)
        AND C.tx_bp_no                  = ISNULL(@tx_bp_no                      ,C.tx_bp_no)
        AND C.tx_customer_name          = ISNULL(@tx_customer_name              ,C.tx_customer_name)
        AND L.tx_loan_tracking_id       = ISNULL(@tx_loan_tracking_id           ,L.tx_loan_tracking_id)
        AND L.dtt_create                >= ISNULL(CAST(@tx_from_date AS DATE)   ,L.dtt_create)
        AND CAST(L.dtt_create AS DATE)  <= ISNULL(CAST(@tx_to_date AS DATE)     ,L.dtt_create)
        AND L.is_active                 = 1

        SELECT DISTINCT CAST(L.dtt_create AS DATE) AS tx_date
        ,0 AS field_officer_count
        ,0 AS ppc_count
        ,0 AS crm_count
        ,0 AS cad_count
        ,0 AS loan_tracker_total
        INTO #TEMP_LOAN_TRACKER_FOR_DASHBOARD
        FROM #TEMP_LOAN_TRACKER L
        ORDER BY CAST(L.dtt_create AS DATE) ASC

        SELECT D.tx_date, COUNT(DISTINCT L.id_loan_key) AS int_count
        INTO #TEMP_ENTRY_FIELD_OFFICER
        FROM #TEMP_LOAN_TRACKER_FOR_DASHBOARD D
        JOIN #TEMP_LOAN_TRACKER L ON CAST(L.dtt_create AS DATE) = D.tx_date
        WHERE L.tx_state_name IN ('FO_CREATED', 'FO_UPDATED')
        GROUP BY D.tx_date

        SELECT D.tx_date, COUNT(DISTINCT L.id_loan_key) AS int_count
        INTO #TEMP_ENTRY_PPC
        FROM #TEMP_LOAN_TRACKER_FOR_DASHBOARD D
        JOIN #TEMP_LOAN_TRACKER L ON CAST(L.dtt_create AS DATE) = D.tx_date 
        WHERE L.tx_state_name IN ('FO_SUBMITTED','SO_UPDATED','CAD_RETURNED','BOM_UPDATED','SO_RECOMMENDED','SEND_QUERY',
              'PPC_RETURNED','BOM_RETURNED','BM_RETURNED','APPROVED_RETURNED','CA_SENT_QUERY')
        GROUP BY D.tx_date

        SELECT D.tx_date, COUNT(DISTINCT L.id_loan_key) AS int_count
        INTO #TEMP_ENTRY_CRM
        FROM #TEMP_LOAN_TRACKER_FOR_DASHBOARD D
        JOIN #TEMP_LOAN_TRACKER L ON CAST(L.dtt_create AS DATE) = D.tx_date 
        WHERE L.tx_state_name IN ('PPC_RECOMMENDED', 'MIS_RECEIVED','MIS_UPDATED','MIS_ALLOCATED','PEND_RECEIVED','CA_RECEIVED','CA_UPDATED','SENT_TO_CIB',
            'SENT_QUERY_UPDATED','CA_RECOMMENDED','RM_APPROVED','RM_RECOMMENDED','UH_APPROVED','UH_RECOMMENDED','HOCRM_APPROVED','HOCRM_RECOMMENDED',
            'RM_C_APPROVED','UH_C_APPROVED','HOCRM_C_APPROVED','CEO_APPROVED','CEO_C_APPROVED','MD_APPROVED','MD_C_APPROVED','MIS_RETURNED','CA_RETURNED',
            'RM_RETURNED','UH_RETURNED','HOCRM_RETURNED','CEO_RETURNED','MD_RETURNED','CAD_SENT_QUERY_TO_CA','CAD_SENT_QUERY_TO_SO',
            'RM_DEFERED','RM_DECLINED','UH_DECLINED','UH_DEFERED','HOCRM_DECLINED','HOCRM_DEFERED','CEO_DECLINED','CEO_DEFERED','MD_DECLINED','MD_DEFERED')
        GROUP BY D.tx_date

        SELECT D.tx_date, COUNT(DISTINCT L.id_loan_key) AS int_count
        INTO #TEMP_ENTRY_CAD
        FROM #TEMP_LOAN_TRACKER_FOR_DASHBOARD D
        JOIN #TEMP_LOAN_TRACKER L ON CAST(L.dtt_create AS DATE) = D.tx_date 
        WHERE L.tx_state_name IN ('CA_CAD_QUERY_UPDATED','SO_CAD_QUERY_UPDATED','SL_GENERATED','SENT_TO_CAD','CAD_DISBURSED')
        GROUP BY D.tx_date

        UPDATE D
        SET D.field_officer_count = ( ISNULL((SELECT int_count FROM #TEMP_ENTRY_FIELD_OFFICER TL WHERE TL.tx_date = D.tx_date), 0) )
        , D.ppc_count = ( ISNULL((SELECT int_count FROM #TEMP_ENTRY_PPC TL WHERE TL.tx_date = D.tx_date), 0) )
        , D.crm_count = ( ISNULL((SELECT int_count FROM #TEMP_ENTRY_CRM TL WHERE TL.tx_date = D.tx_date), 0) )
        , D.cad_count = ( ISNULL((SELECT int_count FROM #TEMP_ENTRY_CAD TL WHERE TL.tx_date = D.tx_date), 0) )
        FROM #TEMP_LOAN_TRACKER_FOR_DASHBOARD D

        SELECT D.tx_date, sum(D.cad_count+D.field_officer_count+D.ppc_count+D.crm_count) AS int_count
        INTO #TEMP_ENTRY_TOTAL
        FROM #TEMP_LOAN_TRACKER_FOR_DASHBOARD D  
        GROUP BY D.tx_date

        UPDATE D
        SET D.loan_tracker_total = ( ISNULL((SELECT int_count FROM #TEMP_ENTRY_TOTAL TL WHERE TL.tx_date = D.tx_date), 0) )
        FROM #TEMP_LOAN_TRACKER_FOR_DASHBOARD D

        SELECT tx_rs_type = 'RS_TYPE_LOAN_TRACKER_DEPT_DATA', * 
        FROM #TEMP_LOAN_TRACKER_FOR_DASHBOARD
        order by #TEMP_LOAN_TRACKER_FOR_DASHBOARD.tx_date DESC

    }
    IF ( @tx_action_name = 'SELECT_LOAN_TRACKER_DEPT_WISE')
    {
        SELECT  tx_rs_type = 'RS_TYPE_FIELD_OFFICER_COUNT'
        , L.*, S.tx_state_name
        ,C.tx_customer_name
        ,C.tx_bp_no
        , S.tx_display_text as tx_state_display_label
        FROM T_LOAN L
        JOIN T_FSM_STATE S ON L.id_state_key = S.id_fsm_state_key
        JOIN T_FSM_TYPE T ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
        JOIN T_CUSTOMER C ON C.id_customer_key = L.id_customer_key 
        AND L.dtt_create      >= ISNULL(CAST(@tx_from_date AS DATE)  ,L.dtt_create)
        AND CAST(L.dtt_create AS DATE) <= ISNULL(CAST(@tx_to_date AS DATE)  ,L.dtt_create)
        AND S.tx_state_name IN ('FO_CREATED', 'FO_UPDATED')

        SELECT  tx_rs_type = 'RS_TYPE_PPC_COUNT'
        , L.*, S.tx_state_name
        ,C.tx_customer_name
        ,C.tx_bp_no
        , S.tx_display_text as tx_state_display_label
        FROM T_LOAN L
        JOIN T_FSM_STATE S ON L.id_state_key = S.id_fsm_state_key
        JOIN T_FSM_TYPE T ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
        JOIN T_CUSTOMER C ON C.id_customer_key = L.id_customer_key 
        AND L.dtt_create      >= ISNULL(CAST(@tx_from_date AS DATE)  ,L.dtt_create)
        AND CAST(L.dtt_create AS DATE) <= ISNULL(CAST(@tx_to_date AS DATE)  ,L.dtt_create)
        AND S.tx_state_name IN ('FO_SUBMITTED','CAD_RETURNED','SO_UPDATED','BOM_UPDATED','SO_RECOMMENDED','SEND_QUERY',
            'PPC_RETURNED','BOM_RETURNED','BM_RETURNED','APPROVED_RETURNED','CA_SENT_QUERY')

        SELECT  tx_rs_type = 'RS_TYPE_CRM_COUNT'
        , L.*, S.tx_state_name
        ,C.tx_customer_name
        ,C.tx_bp_no
        , S.tx_display_text as tx_state_display_label
        FROM T_LOAN L
        JOIN T_FSM_STATE S ON L.id_state_key = S.id_fsm_state_key
        JOIN T_FSM_TYPE T ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
        JOIN T_CUSTOMER C ON C.id_customer_key = L.id_customer_key 
        AND L.dtt_create      >= ISNULL(CAST(@tx_from_date AS DATE)  ,L.dtt_create)
        AND CAST(L.dtt_create AS DATE) <= ISNULL(CAST(@tx_to_date AS DATE)  ,L.dtt_create)
        AND S.tx_state_name IN ('PPC_RECOMMENDED', 'MIS_RECEIVED','MIS_UPDATED','MIS_ALLOCATED','PEND_RECEIVED','CA_RECEIVED','CA_UPDATED','SENT_TO_CIB',
            'SENT_QUERY_UPDATED','CA_RECOMMENDED','RM_APPROVED','RM_RECOMMENDED','UH_APPROVED','UH_RECOMMENDED','HOCRM_APPROVED','HOCRM_RECOMMENDED',
            'RM_C_APPROVED','UH_C_APPROVED','HOCRM_C_APPROVED','CEO_APPROVED','CEO_C_APPROVED','MD_APPROVED','MD_C_APPROVED','MIS_RETURNED','CA_RETURNED',
            'RM_RETURNED','UH_RETURNED','HOCRM_RETURNED','CEO_RETURNED','MD_RETURNED','CAD_SENT_QUERY_TO_CA','CAD_SENT_QUERY_TO_SO',
            'RM_DEFERED','RM_DECLINED','UH_DECLINED','UH_DEFERED','HOCRM_DECLINED','HOCRM_DEFERED','CEO_DECLINED','CEO_DEFERED','MD_DECLINED','MD_DEFERED')

        SELECT  tx_rs_type = 'RS_TYPE_CAD_COUNT'
        , L.*, S.tx_state_name
        ,C.tx_customer_name
        ,C.tx_bp_no
        , S.tx_display_text as tx_state_display_label
        FROM T_LOAN L
        JOIN T_FSM_STATE S ON L.id_state_key = S.id_fsm_state_key
        JOIN T_FSM_TYPE T ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
        JOIN T_CUSTOMER C ON C.id_customer_key = L.id_customer_key 
        AND L.dtt_create      >= ISNULL(CAST(@tx_from_date AS DATE)  ,L.dtt_create)
        AND CAST(L.dtt_create AS DATE) <= ISNULL(CAST(@tx_to_date AS DATE)  ,L.dtt_create)
        AND S.tx_state_name IN ('CA_CAD_QUERY_UPDATED','SO_CAD_QUERY_UPDATED','SL_GENERATED','SENT_TO_CAD','CAD_DISBURSED')

        SELECT  tx_rs_type = 'RS_TYPE_TOTAL_COUNT'
        , L.*, S.tx_state_name
        ,C.tx_customer_name
        ,C.tx_bp_no
        , S.tx_display_text as tx_state_display_label
        FROM T_LOAN L
        JOIN T_FSM_STATE S ON L.id_state_key = S.id_fsm_state_key
        JOIN T_FSM_TYPE T ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
        JOIN T_CUSTOMER C ON C.id_customer_key = L.id_customer_key 
        AND L.dtt_create      >= ISNULL(CAST(@tx_from_date AS DATE)  ,L.dtt_create)
        AND CAST(L.dtt_create AS DATE) <= ISNULL(CAST(@tx_to_date AS DATE)  ,L.dtt_create)
        AND S.tx_state_name IN ('FO_CREATED','FO_UPDATED','CA_SENT_QUERY','FO_SUBMITTED','PEND_RECEIVED','SO_UPDATED','BOM_UPDATED','SO_RECOMMENDED','SEND_QUERY','PPC_RETURNED','BOM_RETURNED','BM_RETURNED','SO_UPDATED','BOM_UPDATED','SO_RECOMMENDED','SEND_QUERY','PPC_RETURNED','BOM_RETURNED','BM_RETURNED','PPC_RECOMMENDED', 'MIS_RECEIVED','MIS_UPDATED','MIS_ALLOCATED','CA_RECEIVED','CA_UPDATED','SENT_TO_CIB',
            'SENT_QUERY_UPDATED','CA_RECOMMENDED','APPROVED_RETURNED','RM_APPROVED','RM_RECOMMENDED','UH_APPROVED','UH_RECOMMENDED','HOCRM_APPROVED','HOCRM_RECOMMENDED',
            'RM_C_APPROVED','UH_C_APPROVED','HOCRM_C_APPROVED','CEO_APPROVED','CEO_C_APPROVED','MD_APPROVED','MD_C_APPROVED','MIS_RETURNED','CA_RETURNED',
            'RM_RETURNED','UH_RETURNED','HOCRM_RETURNED','CEO_RETURNED','MD_RETURNED','CAD_RETURNED','CAD_SENT_QUERY_TO_CA','CAD_SENT_QUERY_TO_SO',
            'RM_DEFERED','RM_DECLINED','UH_DECLINED','UH_DEFERED','HOCRM_DECLINED','HOCRM_DEFERED','CEO_DECLINED','CEO_DEFERED','MD_DECLINED','MD_DEFERED','CA_CAD_QUERY_UPDATED','SO_CAD_QUERY_UPDATED','SL_GENERATED','SENT_TO_CAD','CAD_DISBURSED')

    }

    IF ( @tx_action_name = 'SELECT_LOAN_COUNT_DATE_WISE')
    {
        SELECT L.*, S.tx_state_name
        ,C.tx_customer_name
        ,C.tx_bp_no
        , S.tx_display_text as tx_state_display_label
        INTO #TEMP_LOAN_DATE_WISE
        FROM T_LOAN_AUDIT L
        JOIN T_FSM_STATE S ON L.id_state_key = S.id_fsm_state_key
        JOIN T_CUSTOMER C ON C.id_customer_key = L.id_customer_key 
        JOIN T_FSM_TYPE T ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
        WHERE L.is_active = 1
        AND L.dtt_create      >= ISNULL(CAST(@tx_from_date AS DATE)  ,L.dtt_create)
        AND CAST(L.dtt_create AS DATE) <= ISNULL(CAST(@tx_to_date AS DATE)  ,L.dtt_create)
        ORDER BY CAST(L.dtt_create AS DATE) ASC

        SELECT tx_rs_type = 'RS_TYPE_ELOAN_ENTRY',
        * FROM #TEMP_LOAN_DATE_WISE L        
        WHERE L.is_active = 1
        AND L.tx_state_name = 'FO_SUBMITTED' 
        AND L.tx_data_source = 'MOBILE'
        AND CAST(L.dtt_create AS DATE) = CAST(L.dtt_create AS DATE)
        ORDER BY CAST(L.dtt_create AS DATE) ASC
        

        SELECT tx_rs_type = 'RS_TYPE_LMS_ENTRY',
        * FROM #TEMP_LOAN_DATE_WISE L        
        WHERE L.is_active = 1
        AND L.tx_state_name = 'FO_SUBMITTED' 
        AND L.tx_data_source = 'WEB'
        AND CAST(L.dtt_create AS DATE) = CAST(L.dtt_create AS DATE)
        ORDER BY CAST(L.dtt_create AS DATE) ASC

        SELECT tx_rs_type = 'RS_TYPE_PPC_RECEIVED',
        * FROM #TEMP_LOAN_DATE_WISE L        
        WHERE  L.is_active = 1
        AND L.tx_state_name IN ('SO_RECOMMENDED', 'SO_RE_RECOMMENDED')
        AND CAST(L.dtt_create AS DATE) = CAST(L.dtt_create AS DATE)
        ORDER BY CAST(L.dtt_create AS DATE) ASC

        SELECT tx_rs_type = 'RS_TYPE_PPC_REJECT',
        * FROM #TEMP_LOAN_DATE_WISE L        
        WHERE  L.is_active = 1
        AND L.tx_state_name IN ('PPC_RETURNED')
        AND CAST(L.dtt_create AS DATE) = CAST(L.dtt_create AS DATE)
        ORDER BY CAST(L.dtt_create AS DATE) ASC

        SELECT tx_rs_type = 'RS_TYPE_PPC_RECOMMEND',
        * FROM #TEMP_LOAN_DATE_WISE L        
        WHERE  L.is_active = 1
        AND L.tx_state_name IN ('PEND_RECEIVED', 'CA_RECEIVED')
        AND CAST(L.dtt_create AS DATE) = CAST(L.dtt_create AS DATE)       
        ORDER BY CAST(L.dtt_create AS DATE) ASC

        SELECT tx_rs_type = 'RS_TYPE_CRM_RECEIVED',
        * FROM #TEMP_LOAN_DATE_WISE L        
        WHERE  L.is_active = 1
        AND L.tx_state_name IN ('PEND_RECEIVED', 'CA_RECEIVED')
        AND CAST(L.dtt_create AS DATE) = CAST(L.dtt_create AS DATE)
        ORDER BY CAST(L.dtt_create AS DATE) ASC

        SELECT tx_rs_type = 'RS_TYPE_CRM_REJCET',
        * FROM #TEMP_LOAN_DATE_WISE L        
        WHERE  L.is_active = 1
        AND L.tx_state_name IN ('CA_RETURNED', 'CEO_RETURNED', 'HOCRM_RETURNED', 'MD_RETURNED', 'MIS_RETURNED', 'RM_RETURNED', 'UH_RETURNED')
        AND CAST(L.dtt_create AS DATE) = CAST(L.dtt_create AS DATE)
        ORDER BY CAST(L.dtt_create AS DATE) ASC

        SELECT tx_rs_type = 'RS_TYPE_CRM_APPROVED',
        * FROM #TEMP_LOAN_DATE_WISE L        
        WHERE  L.is_active = 1
        AND L.tx_state_name LIKE '%APPROVED' AND L.tx_state_name NOT LIKE '%_C_APPROVED'
        AND CAST(L.dtt_create AS DATE) = CAST(L.dtt_create AS DATE)
        ORDER BY CAST(L.dtt_create AS DATE) ASC

        SELECT tx_rs_type = 'RS_TYPE_MD_APPROVED',
        * FROM #TEMP_LOAN_DATE_WISE L        
        WHERE  L.is_active = 1
        AND L.tx_state_name IN ('SENT_TO_CAD')
        AND CAST(L.dtt_create AS DATE) = CAST(L.dtt_create AS DATE)
        ORDER BY CAST(L.dtt_create AS DATE) ASC

        SELECT tx_rs_type = 'RS_TYPE_CAD_SANCTION',
        * FROM #TEMP_LOAN_DATE_WISE L        
        WHERE  L.is_active = 1
        AND L.tx_state_name IN ('SL_GENERATED')
        AND CAST(L.dtt_create AS DATE) = CAST(L.dtt_create AS DATE)
        ORDER BY CAST(L.dtt_create AS DATE) ASC
    } 

    IF ( @tx_action_name = 'SELECT_LOAN_STATUS_DEPT_WISE')
    {
        SELECT DISTINCT  L.tx_loan_tracking_id
        , S.tx_display_text as tx_state_display_label
        , S.tx_state_name
        , L.id_state_key
        , L.id_loan_key
        , C.tx_customer_name
        , C.tx_account_no
        , C.tx_bp_no 
        , L.dtt_create
        , L.dtt_mod
        , L.dec_applied_loan_amount    
        , L.is_active
        , L.tx_data_source
        , '' AS tx_status
        INTO #TEMP_LOAN_STATUS_DEPT_WISE_2
        FROM T_LOAN_AUDIT L
        JOIN T_FSM_STATE S ON L.id_state_key = S.id_fsm_state_key
        JOIN T_CUSTOMER C ON C.id_customer_key = L.id_customer_key 
        JOIN T_FSM_TYPE T ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
        WHERE L.is_active = 1
        AND L.dtt_mod >= ISNULL(CAST(@tx_from_date AS DATE)  ,L.dtt_mod)
        AND CAST(L.dtt_mod AS DATE) <= ISNULL(CAST(@tx_to_date  AS DATE)  ,L.dtt_mod) 

        
        select l.* 
        into #TEMP_LOAN_STATUS_DEPT_WISE
        from #TEMP_LOAN_STATUS_DEPT_WISE_2 l
        inner join (
                select ls.id_loan_key, ls.tx_state_name, CAST(ls.dtt_mod AS DATE) as dt_date , max(ls.dtt_mod) as dtt_max
                from #TEMP_LOAN_STATUS_DEPT_WISE_2 ls
                group by ls.id_loan_key, ls.tx_state_name, CAST(ls.dtt_mod AS DATE)
                ) x
        on  CAST(l.dtt_mod AS DATE) = x.dt_date 
        and l.dtt_mod = x.dtt_max
        and l.id_loan_key = x.id_loan_key
        and l.tx_state_name = x.tx_state_name


        SELECT tx_rs_type = 'RS_TYPE_ELOAN_ENTRY'
        , L.*
        FROM #TEMP_LOAN_STATUS_DEPT_WISE L       
        WHERE L.is_active = 1
        AND L.tx_state_name = 'FO_SUBMITTED' 
        AND L.tx_data_source = 'MOBILE'
        

        SELECT tx_rs_type = 'RS_TYPE_LMS_ENTRY'
        , L.*
        FROM #TEMP_LOAN_STATUS_DEPT_WISE L        
        WHERE L.is_active = 1
        AND L.tx_state_name = 'FO_SUBMITTED' 
        AND L.tx_data_source = 'WEB' 

        SELECT tx_rs_type = 'RS_TYPE_PPC_RECEIVED'
        , L.*
        FROM #TEMP_LOAN_STATUS_DEPT_WISE L        
        WHERE  L.is_active = 1
        AND L.tx_state_name IN ('SO_RECOMMENDED', 'SO_RE_RECOMMENDED')

        SELECT tx_rs_type = 'RS_TYPE_PPC_REJECT'
        , L.*
        FROM #TEMP_LOAN_STATUS_DEPT_WISE L        
        WHERE  L.is_active = 1
        AND L.tx_state_name IN ('PPC_RETURNED')

        SELECT tx_rs_type = 'RS_TYPE_PPC_RECOMMEND'
        , L.*
        FROM #TEMP_LOAN_STATUS_DEPT_WISE L        
        WHERE  L.is_active = 1
        AND L.tx_state_name IN ('PEND_RECEIVED')

        SELECT tx_rs_type = 'RS_TYPE_CRM_RECEIVED'
        , L.*
        FROM #TEMP_LOAN_STATUS_DEPT_WISE L        
        WHERE  L.is_active = 1
        AND L.tx_state_name IN ('MIS_RECEIVED', 'CA_RECEIVED')

        SELECT tx_rs_type = 'RS_TYPE_CRM_REJCET'
        , L.*
        FROM #TEMP_LOAN_STATUS_DEPT_WISE L        
        WHERE  L.is_active = 1
        AND L.tx_state_name IN ('CA_RETURNED', 'CEO_RETURNED', 'HOCRM_RETURNED', 'MD_RETURNED', 'MIS_RETURNED', 'RM_RETURNED', 'UH_RETURNED')

        SELECT tx_rs_type = 'RS_TYPE_CRM_APPROVED'
        , L.*
        FROM #TEMP_LOAN_STATUS_DEPT_WISE L        
        WHERE  L.is_active = 1
        AND L.tx_state_name LIKE '%APPROVED' AND L.tx_state_name NOT LIKE '%_C_APPROVED'

        SELECT tx_rs_type = 'RS_TYPE_MD_APPROVED'
        , L.*
        FROM #TEMP_LOAN_STATUS_DEPT_WISE L        
        WHERE  L.is_active = 1
        AND L.tx_state_name IN ('SENT_TO_CAD')

        SELECT tx_rs_type = 'RS_TYPE_CAD_SANCTION'
        , L.*
        FROM #TEMP_LOAN_STATUS_DEPT_WISE L        
        WHERE  L.is_active = 1
        AND L.tx_state_name IN ('SL_GENERATED')
    } 
    IF(@tx_action_name = 'CREATION_DATE_WISE_DEPT_LOAN')
    {
        SELECT  DISTINCT ( CONVERT(DATE, L.dtt_create)) AS dt_date,
        L.tx_loan_tracking_id
        , S.tx_display_text as tx_state_display_label
        , S.tx_state_name
        , L.id_state_key
        , L.id_loan_key
        , C.tx_customer_name
        , L.tx_account_no
        , C.tx_bp_no 
        , L.dtt_create
       , L.dtt_mod
        , L.dec_applied_loan_amount    
        , L.is_active
        , L.tx_data_source
        , '' AS tx_status
        INTO #TEMP_LOAN_STATUS_DEPT_WISE_3
        FROM T_LOAN_AUDIT L
        JOIN T_FSM_STATE S ON L.id_state_key = S.id_fsm_state_key
        JOIN T_CUSTOMER C ON C.id_customer_key = L.id_customer_key 
        JOIN T_FSM_TYPE T ON S.id_fsm_type_key = T.id_fsm_type_key AND T.tx_fsm_type_name = 'LOAN'
        WHERE L.is_active = 1
        AND L.dtt_create >= ISNULL(CAST(@tx_from_date AS DATE)  ,L.dtt_create)
        AND CAST(L.dtt_create AS DATE) <= ISNULL(CAST(@tx_to_date  AS DATE)  ,L.dtt_create) 


        SELECT tx_loan_tracking_id,CAST(dtt_create as date) as dt_date,max(dtt_create) as dtt_max_date
        into #TEMP_LOAN_STATUS_DEPT_WISE_A
        from #TEMP_LOAN_STATUS_DEPT_WISE_3 PD 
        group by tx_loan_tracking_id, CAST(dtt_create as date)

        SELECT tx_rs_type = 'RS_TYPE_ELOAN_ENTRY',l.* 
        FROM #TEMP_LOAN_STATUS_DEPT_WISE_A D
        JOIN #TEMP_LOAN_STATUS_DEPT_WISE_3 L ON l.tx_loan_tracking_id = d.tx_loan_tracking_id and l.dtt_create = d.dtt_max_date
        WHERE L.is_active = 1
        AND L.tx_state_name = 'FO_SUBMITTED' 
        AND L.tx_data_source = 'MOBILE'

        SELECT tx_rs_type = 'RS_TYPE_LMS_ENTRY',l.* 
        FROM #TEMP_LOAN_STATUS_DEPT_WISE_A D
        JOIN #TEMP_LOAN_STATUS_DEPT_WISE_3 L ON l.tx_loan_tracking_id = d.tx_loan_tracking_id and l.dtt_create = d.dtt_max_date
        WHERE L.is_active = 1
        AND L.tx_state_name = 'FO_SUBMITTED' 
        AND L.tx_data_source = 'WEB' 

        SELECT tx_rs_type = 'RS_TYPE_PPC_RECEIVED',l.* 
        FROM #TEMP_LOAN_STATUS_DEPT_WISE_A D
        JOIN #TEMP_LOAN_STATUS_DEPT_WISE_3 L ON l.tx_loan_tracking_id = d.tx_loan_tracking_id and l.dtt_create = d.dtt_max_date
        WHERE L.is_active = 1
        AND L.tx_state_name IN ('SO_RECOMMENDED', 'SO_RE_RECOMMENDED')

        SELECT tx_rs_type = 'RS_TYPE_PPC_REJECT',l.* 
        FROM #TEMP_LOAN_STATUS_DEPT_WISE_A D
        JOIN #TEMP_LOAN_STATUS_DEPT_WISE_3 L ON l.tx_loan_tracking_id = d.tx_loan_tracking_id and l.dtt_create = d.dtt_max_date
        WHERE L.is_active = 1
        AND L.tx_state_name IN ('PPC_RETURNED')

        SELECT tx_rs_type = 'RS_TYPE_PPC_RECOMMEND',l.* 
        FROM #TEMP_LOAN_STATUS_DEPT_WISE_A D
        JOIN #TEMP_LOAN_STATUS_DEPT_WISE_3 L ON l.tx_loan_tracking_id = d.tx_loan_tracking_id and l.dtt_create = d.dtt_max_date
        WHERE L.is_active = 1
        AND L.tx_state_name IN ('PEND_RECEIVED')

        SELECT tx_rs_type = 'RS_TYPE_CRM_RECEIVED',l.* 
        FROM #TEMP_LOAN_STATUS_DEPT_WISE_A D
        JOIN #TEMP_LOAN_STATUS_DEPT_WISE_3 L ON l.tx_loan_tracking_id = d.tx_loan_tracking_id and l.dtt_create = d.dtt_max_date
        WHERE L.is_active = 1
        AND L.tx_state_name IN ('MIS_RECEIVED', 'CA_RECEIVED')

        SELECT tx_rs_type = 'RS_TYPE_CRM_REJCET',l.* 
        FROM #TEMP_LOAN_STATUS_DEPT_WISE_A D
        JOIN #TEMP_LOAN_STATUS_DEPT_WISE_3 L ON l.tx_loan_tracking_id = d.tx_loan_tracking_id and l.dtt_create = d.dtt_max_date
        WHERE L.is_active = 1
        AND L.tx_state_name IN ('CA_RETURNED', 'CEO_RETURNED', 'HOCRM_RETURNED', 'MD_RETURNED', 'MIS_RETURNED', 'RM_RETURNED', 'UH_RETURNED')

        SELECT tx_rs_type = 'RS_TYPE_CRM_APPROVED',l.* 
        FROM #TEMP_LOAN_STATUS_DEPT_WISE_A D
        JOIN #TEMP_LOAN_STATUS_DEPT_WISE_3 L ON l.tx_loan_tracking_id = d.tx_loan_tracking_id and l.dtt_create = d.dtt_max_date
        WHERE L.is_active = 1
        AND L.tx_state_name LIKE '%APPROVED' AND L.tx_state_name NOT LIKE '%_C_APPROVED'

        SELECT tx_rs_type = 'RS_TYPE_MD_APPROVED',l.* 
        FROM #TEMP_LOAN_STATUS_DEPT_WISE_A D
        JOIN #TEMP_LOAN_STATUS_DEPT_WISE_3 L ON l.tx_loan_tracking_id = d.tx_loan_tracking_id and l.dtt_create = d.dtt_max_date
        WHERE L.is_active = 1
        AND L.tx_state_name IN ('SENT_TO_CAD')

        SELECT tx_rs_type = 'RS_TYPE_CAD_SANCTION',l.* 
        FROM #TEMP_LOAN_STATUS_DEPT_WISE_A D
        JOIN #TEMP_LOAN_STATUS_DEPT_WISE_3 L ON l.tx_loan_tracking_id = d.tx_loan_tracking_id and l.dtt_create = d.dtt_max_date
        WHERE L.is_active = 1
        AND L.tx_state_name IN ('SL_GENERATED') 
    }
       
    _SP_FOOTER
}
go

_GRANT_PERM_SP