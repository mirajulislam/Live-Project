/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Md. Meher Dewan
* Date          : 02/02/2020
* Description   : LMS pdf generation stored procedured
*****************************************************************************************/
#include <nSMART_SQL.h>

#define _SP_NAME        {ACT_report};
#define _TABLE_NAME     {T_LOAN};
#define _PRIMARY_KEY    {id_loan_key};
#define _VERSION        {id_loan_ver};

_DROP_PROC

_CREATE_PROC (_SP_NAME)
    
    _SP_PARAM_HEADER

    , @_PRIMARY_KEY                     INT                    = NULL       OUTPUT
    , @_VERSION                         INT                    = NULL   

    , @id_creator_key                   INT                   = NULL
    , @dtt_create                       DATETIME              = NULL
    , @id_customer_key                  INT                   = NULL       OUTPUT

    , @tx_application_no                VARCHAR(256)           = NULL    
    , @id_loan_type_key                 INT                    = NULL
    , @id_customer_type_key             INT                    = NULL
    , @tx_loan_tracking_id              INT                    = NULL       OUTPUT

    , @dec_applied_loan_amount          DECIMAL(20,2)          = NULL
    , @tx_loan_purpose                  VARCHAR(256)           = NULL
    , @int_over_loan                    INT                    = NULL
    , @dec_net_monthly_income           DECIMAL(20,2)          = NULL
    , @dec_tenor_year                   DECIMAL(20,2)          = NULL
    , @dec_existing_loan_amount         DECIMAL(20,2)          = NULL
    , @dec_interest_rate                DECIMAL(20,2)          = NULL
    , @dec_total_emi                    DECIMAL(20,2)          = NULL
    , @dec_monthly_installment          DECIMAL(20,2)          = NULL
    , @dec_disposable_income            DECIMAL(20,2)          = NULL
    , @tx_propose_emi_date              VARCHAR(256)           = NULL
    , @tx_duplications                  VARCHAR(256)           = NULL
    , @dtt_cib_generation_date          DATETIME               = NULL
    , @dec_proposed_dbr                 DECIMAL(20,2)          = NULL
    , @dec_allowed_dbr                  DECIMAL(20,2)          = NULL
    , @tx_cib_status                    VARCHAR(256)           = NULL
    , @dec_price_quotation_amount       DECIMAL(20,2)          = NULL
    , @tx_bank_participation            VARCHAR(256)           = NULL
    , @dec_business_recommed_amnt    DECIMAL(20,2)          = NULL
    , @dec_recommed_for_approval     DECIMAL(20,2)          = NULL

    , @tx_security                      VARCHAR(256)           = NULL
    , @tx_dob_of_pg_year                VARCHAR(256)           = NULL
    , @tx_guarantor_elibiblity          VARCHAR(256)           = NULL
    , @dtt_dob_of_pg                    DATETIME               = NULL
    , @dec_remaining_amt_aft_eml        DECIMAL(20,2)          = NULL
    , @dec_gross_salary_per_month       DECIMAL(20,2)          = NULL
    , @tx_borrower_participation        VARCHAR(256)           = NULL
    , @id_legal_entity_key              INT                    = NULL
    , @id_customer_ver                  INT                    = NULL
    , @tx_name_of_guarantor             VARCHAR(256)           = NULL
    , @tx_relationship_with_applicant   VARCHAR(256)           = NULL

    , @tx_account_no                    VARCHAR(256)           = NULL
    , @tx_bp_no                         VARCHAR(256)           = NULL
    , @tx_nid                           VARCHAR(256)           = NULL
    , @tx_phone                         VARCHAR(256)           = NULL
    , @tx_from_date                     VARCHAR(256)           = NULL
    , @tx_to_date                       VARCHAR(256)           = NULL
    , @tx_ui_action_name                VARCHAR(256)           = NULL
    , @tx_staffId                       VARCHAR(32)            = NULL
    , @tx_condition                     VARCHAR(MAX)            = NULL     OUTPUT
    , @loan_entry_time                  VARCHAR(32)            = NULL
    , @ppc_start_time                   VARCHAR(32)            = NULL
    , @crm_start_time                   VARCHAR(32)            = NULL
    , @crm_end_time                     VARCHAR(32)            = NULL
    , @cad_start_time                   VARCHAR(32)            = NULL
    , @cad_end_time                     VARCHAR(32)            = NULL
    , @dtt_re_submit_date               datetime                = NULL
    , @dec_gPF_amount                   DECIMAL(20,2)          = NULL
    , @tx_loan_group_id                    VARCHAR(32)          = NULL
    , @tx_loan_id_list                      VARCHAR(MAX)        = NULL

    _SP_PARAM_FOOTER

AS

{
    _SP_HEADER

    IF ( (@tx_action_name = 'LMS_HEAD_OFFICE_LOAN_PDF') OR (@tx_action_name = 'LMS_BRANCH_LOAN_PDF'))
    {   
        SELECT L.*
        INTO    #TEMP_LOAN_TABLE
        FROM    T_LOAN L
        WHERE   id_loan_key = @id_loan_key
        AND     is_active = 1

        SELECT  tx_rs_type = 'RS_TYPE_LOAN' ,TL.*
                , C.tx_value1 AS tx_loan_type 
                , S.tx_state_name
                , S.tx_display_text as tx_state_display_label
        FROM    #TEMP_LOAN_TABLE TL
        JOIN    T_FSM_STATE S ON TL.id_state_key = S.id_fsm_state_key
        JOIN    T_CONFIGURATION C ON C.id_configuration_key = TL.id_loan_type_key

        --SELECT @tx_condition = (SELECT tx_condition FROM #TEMP_LOAN_TABLE)
        SELECT tx_rs_type = 'RS_TYPE_CONDITION', tx_condition FROM #TEMP_LOAN_TABLE


        SELECT @id_customer_key = (SELECT id_customer_key FROM #TEMP_LOAN_TABLE)
        SELECT @id_customer_type_key = (SELECT id_customer_type_key FROM #TEMP_LOAN_TABLE)
        SELECT @id_loan_type_key = (SELECT id_loan_type_key FROM #TEMP_LOAN_TABLE)

        SELECT  tx_rs_type = 'RS_TYPE_CUSTOMER' , C.* 
                , 'Permanent Address: ' + C.tx_permanet_addr + ' Office Address : ' + c.tx_office_addr + '  Mobile : ' + C.tx_mobile + ', '+ C.tx_emer_phone AS tx_address_contact_details
               ,(SELECT tx_value1  FROM T_CONFIGURATION WHERE id_configuration_key = @id_customer_type_key) AS tx_customer_type
                ,TLP.tx_application_no      AS tx_application_no
                ,(SELECT tx_value1  FROM T_CONFIGURATION WHERE id_configuration_key = @id_loan_type_key) AS tx_loan_type
                ,TLP.tx_loan_purpose
                ,TLP.int_over_loan
                ,TLP.int_top_up
                , (SELECT tx_staff_id FROM #TEMP_LOAN_TABLE) AS tx_staffId
                , (SELECT tx_sourcing_brc FROM #TEMP_LOAN_TABLE) AS tx_staff_branch_name
        FROM    T_CUSTOMER C
        JOIN    #TEMP_LOAN_TABLE TLP ON TLP.id_customer_key = C.id_customer_key
        JOIN    T_USER U ON TLP.id_creator_key = U.id_user_key
        JOIN    T_LEGAL_ENTITY L ON U.id_legal_entity_key =  L.id_legal_entity_key
        WHERE   C.id_customer_key =  @id_customer_key
        AND     C.is_active = 1


        SELECT  tx_rs_type = 'RS_TYPE_EXISTING_LIABILITY' , L.*
        INTO            #TEMP_EXIS_LIAB_TABLE
        FROM    T_EXISTING_LIABILITY L
        WHERE   id_loan_key = @id_loan_key
        AND     is_active = 1

        IF EXISTS (SELECT  1 FROM #TEMP_EXIS_LIAB_TABLE)
        {
            SELECT  * FROM #TEMP_EXIS_LIAB_TABLE
        }
        ELSE
        {
            SELECT tx_rs_type = 'RS_TYPE_EXISTING_LIABILITY' ,id_existing_liability_key = 0, dtt_mod = GETDATE(), id_loan_key = @id_loan_key, tx_bank_name = null, 
            tx_product_name = null, dec_disbursed = null, dec_current_outstanding = null,   dec_emi_size = null,    tx_remarks = null
        }
        
        SELECT tx_rs_type = 'RS_TYPE_TRACKING_ID' , TLTFB.* FROM #TEMP_LOAN_TABLE TLTFB

        SELECT  tx_rs_type = 'RS_TYPE_LOAN_TYPE' , CON.tx_value3 AS tx_loan_type
        FROM    T_CONFIGURATION CON 
            JOIN    #TEMP_LOAN_TABLE LN ON  LN.id_loan_type_key = CON.id_configuration_key 
            

        IF (@tx_action_name = 'LMS_HEAD_OFFICE_LOAN_PDF')
        { 

            SELECT  tx_rs_type = 'RS_TYPE_ANALYSTS_COMMENTS' , C.*
            INTO            #TEMP_ANALYSTS_COMMENTS
            FROM    T_COMMENT C
            WHERE   tx_object_type = 'LOAN'
            AND     tx_comment_type = 'ANALYSTS_COMMENTS'
            AND     id_ref_key = @id_loan_key
            AND     is_active = 1

            IF EXISTS (SELECT  1 FROM #TEMP_ANALYSTS_COMMENTS)
            {
                SELECT  * FROM #TEMP_ANALYSTS_COMMENTS
            }
            ELSE
            {
                SELECT tx_rs_type = 'RS_TYPE_ANALYSTS_COMMENTS', id_comment_key = 0, dtt_mod = GETDATE(), id_ref_key = @id_loan_key,
                 tx_comment = null, tx_commented_by = null,  tx_object_type = null, tx_comment_type = null
            }

            SELECT  tx_rs_type = 'RS_TYPE_EXCEPTION_DETAILS' , C.*
            INTO    #TEMP_EXCEPTION_DETAILS
            FROM    T_COMMENT C
            WHERE   tx_object_type = 'LOAN'
            AND     tx_comment_type = 'EXCEPTION_DETAILS'
            AND     id_ref_key = @id_loan_key
            AND     is_active = 1

            IF EXISTS (SELECT  1 FROM #TEMP_EXCEPTION_DETAILS)
            {
                SELECT  * FROM #TEMP_EXCEPTION_DETAILS
            }
            ELSE
            {
                SELECT tx_rs_type = 'RS_TYPE_EXCEPTION_DETAILS', id_comment_key = 0, dtt_mod = GETDATE(), id_ref_key = @id_loan_key,
                 tx_comment = null, tx_commented_by = null,  tx_object_type = null, tx_comment_type = null
            }

            SELECT  tx_rs_type = 'RS_TYPE_INSTRUCTION_TO_CAD' , C.*
            INTO    #TEMP_INSTRUCTION_TO_CAD
            FROM    T_COMMENT C
            WHERE   tx_object_type = 'LOAN'
            AND     tx_comment_type = 'INSTRUCTION_TO_CAD'
            AND     id_ref_key = @id_loan_key
            AND     is_active = 1

            IF EXISTS (SELECT  1 FROM #TEMP_INSTRUCTION_TO_CAD)
            {
                SELECT  * FROM #TEMP_INSTRUCTION_TO_CAD
            }
            ELSE
            {
                SELECT tx_rs_type = 'RS_TYPE_INSTRUCTION_TO_CAD', id_comment_key = 0, dtt_mod = GETDATE(), id_ref_key = @id_loan_key,
                 tx_comment = null, tx_commented_by = null,  tx_object_type = null, tx_comment_type = null
            }

            UPDATE #TEMP_LOAN_TABLE 
            SET tx_dob_of_pg_year = ''
            WHERE dtt_dob_of_pg IS NULL
            
            SELECT tx_rs_type = 'RS_TYPE_LOAN_2' , TL.* FROM #TEMP_LOAN_TABLE TL


            SELECT TOP 1 tx_rs_type = 'RS_TYPE_MANAGER', USR.tx_login_name AS tx_user_name, USR.tx_designation
            FROM T_LOAN_AUDIT AU join T_FSM_STATE ST ON ST.id_fsm_state_key=AU.id_state_key
            JOIN T_USER USR ON USR.id_user_key=AU.id_user_mod_key
            WHERE id_loan_key = @id_loan_key
            AND 
            (
                ST.tx_state_name = 'RM_APPROVED' 
                OR ST.tx_state_name = 'RM_RE_APPROVED' 
                OR ST.tx_state_name = 'UH_APPROVED'
                OR ST.tx_state_name = 'UH_RE_APPROVED' 
                OR 
                (
                    ST.tx_state_name = 'RM_RECOMMENDED' 
                    OR ST.tx_state_name = 'UH_RECOMMENDED'
                    AND 
                    (
                        SELECT tx_role_name FROM T_ROLE ROL 
                        WHERE ROL.id_role_key = AU.int_recommend_group_key
                    ) = 'HO_CRM'
                )
            )
            ORDER BY AU.dtt_mod DESC
        }
        ELSE IF ( @tx_action_name = 'LMS_BRANCH_LOAN_PDF' )
        {
            SELECT  tx_rs_type = 'RS_TYPE_LOAN_DOCUMENT' , D.*
            FROM    T_LOAN_DOCUMENT D
            WHERE   id_loan_key = @id_loan_key
            AND     is_active = 1

            SELECT  tx_rs_type = 'RS_TYPE_WAIVER_SOUGHT' , C.*
            INTO            #TEMP_WAIVER_SOUGHT
            FROM    T_COMMENT C
            WHERE   tx_object_type = 'LOAN'
            AND     tx_comment_type = 'COMMENTS_WAIVER_SOUGHT'
            AND     id_ref_key = @id_loan_key
            AND     is_active = 1

            IF EXISTS (SELECT  1 FROM #TEMP_WAIVER_SOUGHT)
            {
                SELECT  * FROM #TEMP_WAIVER_SOUGHT
            }
            ELSE
            {
                SELECT tx_rs_type = 'RS_TYPE_WAIVER_SOUGHT', id_comment_key = 0, dtt_mod = GETDATE(), id_ref_key = @id_loan_key,
                tx_comment = null, tx_commented_by = null,  tx_object_type = null, tx_comment_type = null
            }

            SELECT  tx_rs_type = 'RS_TYPE_COMMENTS_JUSTIFICATION' , C.*
            INTO            #TEMP_COMM_JUS
            FROM    T_COMMENT C
            WHERE   tx_object_type = 'LOAN'
            AND     tx_comment_type = 'COMMENTS_JUSTIFICATION'
            AND     id_ref_key = @id_loan_key
            AND     is_active = 1

            IF EXISTS (SELECT  1 FROM #TEMP_COMM_JUS)
            {
                SELECT  * FROM #TEMP_COMM_JUS
            }
            ELSE
            {
                SELECT tx_rs_type = 'RS_TYPE_COMMENTS_JUSTIFICATION', id_comment_key = 0, dtt_mod = GETDATE(), id_ref_key = @id_loan_key,
                tx_comment = null, tx_commented_by = null,  tx_object_type = null, tx_comment_type = null
            }

            SELECT  tx_rs_type = 'RS_TYPE_SO_RECOMM}ATION' , C.*
            INTO            #TEMP_SO_RECO
            FROM    T_COMMENT C
            WHERE   tx_object_type = 'LOAN'
            AND     tx_comment_type = 'SO_RECOMM}ATION'
            AND     id_ref_key = @id_loan_key
            AND     is_active = 1

            IF EXISTS (SELECT  1 FROM #TEMP_SO_RECO)
            {
                SELECT  * FROM #TEMP_SO_RECO
            }
            ELSE
            {
                SELECT tx_rs_type = 'RS_TYPE_SO_RECOMM}ATION', id_comment_key = 0, dtt_mod = GETDATE(), id_ref_key = @id_loan_key,
                tx_comment = null, tx_commented_by = null,  tx_object_type = null, tx_comment_type = null
            }

            SELECT  tx_rs_type = 'RS_TYPE_BM_RECOMM}ATION' , C.*
            INTO            #TEMP_BM_RECO
            FROM    T_COMMENT C
            WHERE   tx_object_type = 'LOAN'
            AND     tx_comment_type = 'BM_RECOMM}ATION'
            AND     id_ref_key = @id_loan_key
            AND     is_active = 1

            IF EXISTS (SELECT  1 FROM #TEMP_BM_RECO)
            {
                SELECT  * FROM #TEMP_BM_RECO
            }
            ELSE
            {
                SELECT tx_rs_type = 'RS_TYPE_BM_RECOMM}ATION', id_comment_key = 0, dtt_mod = GETDATE(), id_ref_key = @id_loan_key,
                tx_comment = null, tx_commented_by = null,  tx_object_type = null, tx_comment_type = null
            }

            SELECT @id_legal_entity_key = id_legal_entity_key FROM T_USER 
            WHERE id_user_key = (
                SELECT id_creator_key FROM T_LOAN_AUDIT WHERE id_loan_key = @id_loan_key AND id_loan_ver = 0
            ) 
            AND is_active = 1

            SELECT tx_rs_type = 'RS_TYPE_BRANCH_NAME_STUFF_ID'
            , tx_staff_id AS tx_staffId
            , tx_sourcing_brc AS tx_staff_branch_name 
            FROM T_LOAN
            WHERE id_loan_key = @id_loan_key
        } 
    } 

    IF(@tx_action_name ='LMS_MEMO_REPORT_PDF')
    {

        SELECT tx_rs_type = 'RS_TYPE_LOAN_VIEW_MEMO'
        , ROW_NUMBER() OVER (ORDER BY T.tx_loan_tracking_id) AS Sl_Number
        , T.tx_loan_tracking_id
        , C.tx_bp_no
        , C.tx_customer_name
        , C.tx_designation
        , T.dec_proposed_dbr
        , ( (convert(DECIMAL(10,2),(SUBSTRING(C.tx_remaining_year_of_retirement, CHARINDEX('y', C.tx_remaining_year_of_retirement)-2,2))))+
            (convert(DECIMAL(10,2),(SUBSTRING(C.tx_remaining_year_of_retirement, CHARINDEX(' ', C.tx_remaining_year_of_retirement)+1,1)))/12)
          ) as dec_remaining_year
        , (CASE 
             WHEN (T.int_top_up = 0 AND T.int_over_loan = 0) THEN 0
             ELSE 1 
 
          END) as int_top_up_take_over
        ,C.tx_district
        ,C.tx_division
        ,T.dec_tenor_year
        ,(
            CASE 
             WHEN (T.dec_recommended_for_approval=-2147483648.00)  THEN 0 
               
             ELSE T.dec_recommended_for_approval
            END
        )AS dec_recommended_for_approval

        FROM T_LOAN T
        JOIN T_CUSTOMER C ON T.id_customer_key=C.id_customer_key where tx_loan_group_id=@tx_loan_group_id;

        SELECT tx_rs_type = 'RS_TYPE_TOTAL_AMOUNT_FILE'
            , COUNT(T.tx_loan_tracking_id) AS TotalFile 
            , SUM(CASE 
                 WHEN (T.dec_recommended_for_approval=-2147483648.00)  THEN 0 
                   
                 ELSE T.dec_recommended_for_approval
            END
            ) AS TotalAmount       
        FROM T_LOAN T
        JOIN T_CUSTOMER C ON T.id_customer_key=C.id_customer_key 
        where tx_loan_group_id = @tx_loan_group_id;
    }

    IF (@tx_action_name = 'LMS_LOAN_EXCEL_REPORT')
    {

           DECLARE @l_tmp_tx varchar(2048) = '?'
           DECLARE @l_tmp_dt datetime = null

           CREATE TABLE #T_TMP_LOAN3 (
                loan_id INT NULL
            )

            INSERT INTO #T_TMP_LOAN3
            SELECT loan_id = splitdata FROM dbo.fnSplitString(@tx_loan_id_list, ',')

            SELECT 
             L.id_loan_key
            , CUST.*
            , tx_loan_current_status    = ST.tx_state_name
            , tx_loan_type              = CFG.tx_value1
            , tx_customer_type          = CON1.tx_value1
            , tx_loan_creator           = ur.tx_login_name
            , tx_input_by               = ur.tx_login_name
            , tx_cbs_user_id            = ur.tx_cbs_user_id 
            , dtt_crm_received_date     = @l_tmp_dt
            , tx_analyst                = @l_tmp_tx 
            , tx_user_name              = @l_tmp_tx
            , dtt_of_query              = @l_tmp_dt
            , dtt_return_to_source_date = @l_tmp_dt                 
            , tx_analyst_comments       = @l_tmp_tx
            , dtt_approved_date         = @l_tmp_dt
            , dtt_sent_to_cad           = @l_tmp_dt   
            , tx_comment_action = (
                SELECT (
                            STUFF(
                                (
                                    SELECT +'  Comment : ' + C.tx_comment + '   ,  ' + 'Commeted By : ' + C.tx_commented_by  + '   #   '
                                    FROM T_COMMENT   c WITH(NOLOCK)
                                    WHERE c.id_ref_key = L.id_loan_key
                                    AND c.tx_object_type IN ('LOAN_ACTION_COMMENT') 
                                    AND c.tx_comment_type != 'CA_SEND_QUERY_COMMENT'
                                    FOR XML PATH('')
                                ), 1, 2, '')
                        )

                    ) 
                , tx_query_comments = (
                SELECT (
                    STUFF(
                        (
                            SELECT +'  Comment : ' + C.tx_comment + '   ,  ' + 'Commeted By : ' + C.tx_commented_by  + '   #   '
                            FROM T_COMMENT   c WITH(NOLOCK)
                            WHERE c.id_ref_key = L.id_loan_key
                            AND c.tx_object_type IN ('LOAN_ACTION_COMMENT') 
                            AND c.tx_comment_type = 'CA_SEND_QUERY_COMMENT'
                            FOR XML PATH('')
                        ), 1, 2, '')
                        )
                )         
            INTO #T_REPORT
            FROM T_LOAN             L
            JOIN #T_TMP_LOAN3       TL      ON TL.loan_id                 = L.id_loan_key
            JOIN T_CUSTOMER         CUST    ON CUST.id_customer_key       = L.id_customer_key
            JOIN T_USER             ur      ON ur.id_user_key             = L.id_user_mod_key
            JOIN T_FSM_STATE        ST      ON ST.id_fsm_state_key        = L.id_state_key
            JOIN T_CONFIGURATION    CFG     ON CFG.id_configuration_key   = L.id_loan_type_key
            JOIN T_CONFIGURATION    CON1    ON CON1.id_configuration_key  = L.id_customer_type_key

            -- dtt_crm_received_date            

            UPDATE  #T_REPORT
            SET     dtt_crm_received_date =  (  SELECT  MAX(AUD.dtt_mod) 
                                                FROM    T_LOAN_AUDIT    AUD
                                                JOIN    T_FSM_STATE     FST ON FST.id_fsm_state_key = AUD.id_state_key
                                                AND     FST.tx_state_name IN('MIS_RECEIVED','CA_RECEIVED')
                                                AND     AUD.id_loan_key     = TMP.id_loan_key
                                            )
            FROM    #T_REPORT       TMP
            
            -- tx_analyst
            UPDATE  #T_REPORT
            SET     tx_analyst            = ( SELECT  MAX(ur.tx_first_name + ' ' + ur.tx_last_name)
                                                FROM .T_LOAN_AUDIT  AUD
                                                JOIN    T_USER          ur  on ur.id_user_key       = TMP.id_user_mod_key
                                                JOIN    T_FSM_STATE     FST ON FST.id_fsm_state_key = AUD.id_state_key                                              
                                                AND     FST.tx_state_name IN('CA_RECOMMENDED','CA_UPDATED')
                                                AND     AUD.id_loan_key     = TMP.id_loan_key
            )
            FROM    #T_REPORT       TMP

            --tx_user_name
            UPDATE  #T_REPORT
            SET     tx_user_name = ( SELECT  MAX(ur.tx_first_name + ' ' + ur.tx_last_name)
                                                FROM .T_LOAN_AUDIT  AUD
                                                JOIN    T_USER          ur  on ur.id_user_key       = TMP.id_user_mod_key
                                                JOIN    T_FSM_STATE     FST ON FST.id_fsm_state_key = AUD.id_state_key                                              
                                                AND     FST.tx_state_name IN('SO_RECOMMENDED','SO_UPDATED') 
                                                AND     AUD.id_loan_key     = TMP.id_loan_key
            )
            FROM    #T_REPORT       TMP     
            
            -- dtt_of_query
            UPDATE  #T_REPORT
            SET     dtt_of_query =  (   SELECT  MAX(AUD.dtt_mod) 
                                                FROM    T_LOAN_AUDIT    AUD
                                                JOIN    T_FSM_STATE     FST ON FST.id_fsm_state_key = AUD.id_state_key
                                                AND     FST.tx_state_name IN('CA_SENT_QUERY')
                                                AND     AUD.id_loan_key     = TMP.id_loan_key
                                            )
            FROM    #T_REPORT       TMP     

            -- dtt_return_to_source_date
            UPDATE  #T_REPORT
            SET     dtt_return_to_source_date = (   SELECT  MAX(AUD.dtt_mod) 
                                                FROM    T_LOAN_AUDIT    AUD
                                                JOIN    T_FSM_STATE     FST ON FST.id_fsm_state_key = AUD.id_state_key
                                                AND     FST.tx_state_name IN('BM_RETURNED' ,  'MIS_RETURNED')
                                                AND     AUD.id_loan_key     = TMP.id_loan_key
                                            )
            FROM    #T_REPORT       TMP

            --tx_analyst_comments
            UPDATE  #T_REPORT 
            SET tx_analyst_comments = (
            SELECT TOP 1 C.tx_comment
                FROM T_COMMENT C
                WHERE tx_object_type = 'LOAN'
                AND tx_comment_type = 'ANALYSTS_COMMENTS'               
                AND id_ref_key = TMP.id_loan_key
                AND is_active = 1
            )
            FROM    #T_REPORT TMP
                
            -- dtt_approved_date
            UPDATE  #T_REPORT
            SET     dtt_approved_date = (   SELECT  MAX(AUD.dtt_mod) 
                                                FROM    T_LOAN_AUDIT    AUD
                                                JOIN    T_FSM_STATE     FST ON FST.id_fsm_state_key = AUD.id_state_key
                                                AND     FST.tx_state_name LIKE '%APPROVED%'
                                                AND     AUD.id_loan_key     = TMP.id_loan_key
                                            )
            FROM    #T_REPORT       TMP
            
            -- dtt_sent_to_cad
            UPDATE  #T_REPORT
            SET     dtt_sent_to_cad = ( SELECT  MAX(AUD.dtt_mod) 
                                                FROM    T_LOAN_AUDIT    AUD
                                                JOIN    T_FSM_STATE     FST ON FST.id_fsm_state_key = AUD.id_state_key
                                                AND     FST.tx_state_name ='SENT_TO_CAD'
                                                AND     AUD.id_loan_key     = TMP.id_loan_key
                                            )
            FROM    #T_REPORT       TMP
                
            SELECT tx_rs_type = 'RS_TYPE_LMS_LOAN_EXCEL_REPORT', TR.* , TL.*
            FROM #T_REPORT TR
            join T_LOAN TL ON TL.id_loan_key =TR.id_loan_key

            
            /*
            sp_helpindex T_LOAN_AUDIT
            sp_helpindex T_FSM_STATE

            CREATE UNIQUE INDEX pk_loan_audit  ON T_LOAN_AUDIT (id_loan_key, id_loan_ver)

            CREATE INDEX idx_state ON T_LOAN_AUDIT(id_state_key)

            CREATE INDEX idx_dtt_mod ON T_LOAN_AUDIT (dtt_mod)

            CREATE INDEX idx_state_name on T_FSM_STATE (tx_state_name)

            CREATE INDEX idx_date_state ON T_LOAN_AUDIT (dtt_mod, id_state_key)

            */             
    }

     IF (@tx_action_name = 'LMS_LOAN_EXCEL_REPORT2' OR @tx_action_name = 'PPC_EXCEL_REPORT')
    {      
            
        IF (@tx_action_name = 'LMS_LOAN_EXCEL_REPORT2')
        {                   
           CREATE TABLE #T_TMP_LOAN2 (
                loan_id INT NULL
            )

            INSERT INTO #T_TMP_LOAN2
            SELECT loan_id = splitdata FROM dbo.fnSplitString(@tx_loan_id_list, ',')

            SELECT tx_rs_type = 'RS_TYPE_LMS_LOAN_EXCEL_REPORT'
            , L.*
            , CUST.*
            , tx_loan_current_status = (
                SELECT TOP 1 ST.tx_state_name
                FROM T_LOAN_AUDIT   ADT
                JOIN T_FSM_STATE    ST  ON ST.id_fsm_state_key = ADT.id_state_key
                WHERE ADT.id_loan_key = L.id_loan_key
                ORDER BY ADT.dtt_mod DESC
                )
            , tx_loan_type = (
                SELECT TOP 1 CON.tx_value1
                FROM T_CONFIGURATION CON
                WHERE id_configuration_key = (
                    SELECT top 1 T.id_loan_type_key
                    FROM T_LOAN T
                    WHERE id_loan_key = L.id_loan_key
                    ORDER BY T.dtt_mod DESC)
                ORDER BY CON.dtt_mod DESC
                )
            , dtt_crm_received_date = (
                SELECT TOP 1 AUD.dtt_mod
                FROM T_LOAN_AUDIT AUD
                JOIN T_FSM_STATE ST ON ST.id_fsm_state_key = AUD.id_state_key
                WHERE AUD.id_loan_key = L.id_loan_key
                AND ST.tx_state_name IN('MIS_RECEIVED','CA_RECEIVED')
                ORDER BY AUD.dtt_mod DESC
                )
            , tx_analyst = (
                SELECT TOP 1 U.tx_login_name
                FROM T_USER U
                JOIN T_LOAN_AUDIT A ON A.id_user_mod_key = U.id_user_key
                JOIN T_FSM_STATE ST ON ST.id_fsm_state_key = A.id_state_key
                WHERE A.id_loan_key = L.id_loan_key
                AND st.tx_state_name IN('CA_RECOMMENDED','CA_UPDATED')
                ORDER BY A.dtt_mod DESC
                )
            , tx_user_name = (
                SELECT TOP 1 U.tx_first_name + ' ' + U.tx_last_name
                FROM T_USER U
                JOIN T_LOAN_AUDIT A ON A.id_user_mod_key = U.id_user_key
                JOIN T_FSM_STATE ST ON ST.id_fsm_state_key = A.id_state_key
                WHERE A.id_loan_key = L.id_loan_key
                AND st.tx_state_name IN('SO_RECOMMENDED','SO_UPDATED')
                ORDER BY A.dtt_mod DESC
                )
            , dtt_of_query = (
                SELECT TOP 1 ADT.dtt_mod
                FROM T_LOAN_AUDIT ADT
                JOIN T_FSM_STATE STE ON ADT.id_state_key = STE.id_fsm_state_key
                WHERE id_loan_key = L.id_loan_key
                AND STE.tx_state_name = 'CA_SENT_QUERY'
                ORDER BY ADT.dtt_mod DESC
                )
            , dtt_return_to_source_date = (
                SELECT TOP 1 AUD.dtt_mod
                FROM T_LOAN_AUDIT AUD
                JOIN T_FSM_STATE ST ON ST.id_fsm_state_key = AUD.id_state_key
                WHERE AUD.id_loan_key = L.id_loan_key
                AND (ST.tx_state_name = 'BM_RETURNED' OR ST.tx_state_name = 'MIS_RETURNED')
                ORDER BY AUD.dtt_mod DESC
                )
            , tx_analyst_comments = (
                SELECT TOP 1 C.tx_comment
                FROM T_COMMENT C
                WHERE tx_object_type = 'LOAN'
                AND tx_comment_type = 'ANALYSTS_COMMENTS'
                AND id_ref_key = L.id_loan_key
                AND is_active = 1
                ORDER BY C.dtt_mod DESC
                )
            , dtt_approved_date = (
                SELECT TOP 1 AUD.dtt_mod
                FROM T_LOAN_AUDIT AUD
                JOIN T_FSM_STATE ST ON ST.id_fsm_state_key = AUD.id_state_key
                WHERE AUD.id_loan_key = L.id_loan_key
                AND ST.tx_state_name LIKE '%APPROVED%'
                ORDER BY AUD.dtt_mod DESC
                )
            , dtt_sent_to_cad = (
                SELECT TOP 1 AUD.dtt_mod
                FROM T_LOAN_AUDIT AUD
                JOIN T_FSM_STATE ST ON ST.id_fsm_state_key = AUD.id_state_key
                WHERE AUD.id_loan_key = L.id_loan_key
                AND ST.tx_state_name = 'SENT_TO_CAD'
                ORDER BY AUD.dtt_mod DESC
                )
            , tx_cbs_user_id = (
                SELECT DISTINCT US.tx_cbs_user_id
                FROM T_USER US
                JOIN T_LOAN_AUDIT AUD ON AUD.id_creator_key = US.id_user_key
                WHERE AUD.id_loan_key = L.id_loan_key
                )
            , tx_customer_type = (
                SELECT TOP 1 CON.tx_value1
                FROM T_CONFIGURATION CON
                WHERE id_configuration_key = (
                    SELECT TOP 1 AUD.id_customer_type_key
                    FROM T_LOAN_AUDIT AUD
                    WHERE id_loan_key = L.id_loan_key
                    ORDER BY AUD.dtt_mod DESC
                    )
                ORDER BY CON.dtt_mod DESC
                )
            , tx_input_by = (
                SELECT DISTINCT US.tx_login_name
                FROM T_USER US
                JOIN T_LOAN_AUDIT AUD ON AUD.id_creator_key = US.id_user_key
                WHERE AUD.id_loan_key = L.id_loan_key
                )
            FROM T_LOAN         L 
            JOIN T_CUSTOMER     CUST    ON CUST.id_customer_key = L.id_customer_key
            WHERE EXISTS (SELECT loan_id FROM #T_TMP_LOAN2 WHERE loan_id = L.id_loan_key)
        }

        ELSE IF (@tx_action_name = 'PPC_EXCEL_REPORT')
        {

           CREATE TABLE #T_TMP_LOAN (
                loan_id INT NULL
            )

            INSERT INTO #T_TMP_LOAN
            SELECT loan_id = splitdata FROM dbo.fnSplitString(@tx_loan_id_list, ',')
            
            SELECT tx_rs_type = 'RS_TYPE_LMS_MIS_PPC_EXCEL_REPORT'
            , L.*
            , CUST.*
            , tx_loan_current_status    = ST.tx_state_name
            , tx_legal_entity_name      = LE.tx_legal_entity_name
            , tx_loan_creator           = U.tx_login_name
            , tx_loan_type              = CON.tx_value1
            , tx_user_name              = (
                    SELECT TOP 1 U.tx_first_name + ' ' + U.tx_last_name
                    FROM T_USER         U
                    JOIN T_LOAN_AUDIT   A   ON A.id_user_mod_key    = U.id_user_key
                    JOIN T_FSM_STATE    ST  ON ST.id_fsm_state_key  = A.id_state_key
                    --WHERE A.id_loan_key = TL.loan_id
                    WHERE A.id_loan_key = L.id_loan_key
                    AND ST.tx_state_name IN('SO_RECOMMENDED','SO_UPDATED')
                    ORDER BY A.dtt_mod DESC
                )
            , tx_state_map = (
                    SELECT (
                        STUFF(
                            (
                                SELECT '@' + s.tx_state_name + ',' + convert(varchar, A.dtt_mod, 20)
                                FROM T_LOAN_AUDIT   A WITH(NOLOCK)
                                JOIN T_FSM_STATE    S ON S.id_fsm_state_key = A.id_state_key
                                WHERE A.id_loan_key = L.id_loan_key
                                FOR XML PATH('')
                            ), 1, 2, '')
                    ) AS tx_stt_map
                )
            , tx_comment_action = (
                SELECT (
                    STUFF(
                        (
                            SELECT +'  Comment : ' + C.tx_comment + '   ,  ' + 'Commeted By : ' + C.tx_commented_by  + '   #   '
                            FROM T_COMMENT   c WITH(NOLOCK)
                            WHERE c.id_ref_key = L.id_loan_key
                            AND c.tx_object_type IN ('LOAN_ACTION_COMMENT') 
                            AND c.tx_comment_type != 'CA_SEND_QUERY_COMMENT'
                            FOR XML PATH('')
                        ), 1, 2, '')
                        )

                )
            ,  tx_query_comments = (
                SELECT (
                    STUFF(
                        (
                            SELECT +'  Comment : ' + C.tx_comment + '   ,  ' + 'Commeted By : ' + C.tx_commented_by  + '   #   '
                            FROM T_COMMENT   c WITH(NOLOCK)
                            WHERE c.id_ref_key = L.id_loan_key
                            AND c.tx_object_type IN ('LOAN_ACTION_COMMENT') 
                            AND c.tx_comment_type = 'CA_SEND_QUERY_COMMENT'
                            FOR XML PATH('')
                        ), 1, 2, '')
                        )
                )
            FROM T_LOAN             L
            --JOIN #T_TMP_LOAN      TL      ON TL.loan_id               = L.id_loan_key
            JOIN T_CUSTOMER         CUST    ON CUST.id_customer_key     = L.id_customer_key 
            JOIN T_CONFIGURATION    CON     ON CON.id_configuration_key = L.id_loan_type_key
            JOIN T_FSM_STATE        ST      ON ST.id_fsm_state_key      = L.id_state_key
            JOIN T_USER             U       ON U.id_user_key            = L.id_creator_key
            JOIN T_LEGAL_ENTITY     LE      ON LE.id_legal_entity_key   = U.id_legal_entity_key
            WHERE EXISTS (SELECT loan_id FROM #T_TMP_LOAN WHERE loan_id = L.id_loan_key)
            --WHERE id_loan_key IN (SELECT loan_id FROM #T_TMP_LOAN)
        }
    }

    _SP_FOOTER
}
go

_GRANT_PERM_SP