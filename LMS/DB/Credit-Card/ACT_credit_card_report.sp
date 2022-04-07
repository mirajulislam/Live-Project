/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Mirajul-islam
* Date          : 12/09/2021
* Description   : LMS pdf generation stored procedured
*****************************************************************************************/
#include <nSMART_SQL.h>

#define _SP_NAME        {ACT_credit_card_report};
#define _TABLE_NAME     {T_CREDIT_CARD};
#define _PRIMARY_KEY    {id_credit_card_key};
#define _VERSION        {id_credit_card_ver};

_DROP_PROC

_CREATE_PROC (_SP_NAME)
    
    _SP_PARAM_HEADER

    , @_PRIMARY_KEY                     INT                    = NULL       OUTPUT
    , @_VERSION                         INT                    = NULL   

    , @id_customer_key                      INT                 = NULL
    , @id_creator_key                       INT                 = NULL
    , @dtt_create                           DATETIME            = NULL
    , @id_card_type_key                     INT                 = NULL
    , @id_customer_type_key                 INT                 = NULL 
    , @tx_data_source                       VARCHAR(32)         = NULL
    , @tx_account_no                        VARCHAR(32)         = NULL
    , @tx_sourcing_staff_id                 VARCHAR(32)         = NULL
    , @tx_source_branch                     VARCHAR(128)        = NULL
    , @int_cc_tracking_number               INT                 = NULL
    , @tx_application_number                VARCHAR(64)         = NULL
    , @tx_source_from                       VARCHAR(256)        = NULL
    , @tx_card_monthly_bil_debited_from     VARCHAR(64)         = NULL
    , @dec_salary_deposited_last_month      DECIMAL(20, 2)      = NULL
    , @dec_additional_income_amount         DECIMAL(20, 2)      = NULL
    , @dec_after_cbbl_emi                   DECIMAL(20, 2)      = NULL
    , @dec_total_income                     DECIMAL(20, 2)      = NULL
    , @dec_total_emi_paid_in_cbbl           DECIMAL(20, 2)      = NULL
    , @dec_minimum_amount                   DECIMAL(20, 2)      = NULL
    , @dec_remaining_emi                    DECIMAL(20, 2)      = NULL
    , @tx_additional_income_source          VARCHAR(256)        = NULL
    , @tx_value_of_security                 VARCHAR(256)        = NULL
    , @tx_loan_to_value                     VARCHAR(256)        = NULL
    , @tx_gpf_loan                          VARCHAR(256)        = NULL
    , @dec_pre_approved_limit               DECIMAL(20, 2)      = NULL
    , @dec_pre_approved_limit_lower         DECIMAL(20, 2)      = NULL
    , @dec_pre_approved_limited_upper       DECIMAL(20, 2)      = NULL
    , @dec_pre_approved_limit_range         DECIMAL(20, 2)      = NULL
    , @dec_applied_card_min_bill            DECIMAL(20, 2)      = NULL
    , @dec_applied_amount                   DECIMAL(20, 2)      = NULL
    , @tx_individual_declaration            VARCHAR(256)        = NULL
    , @dt_card_delivery_from                DATE                = NULL
    , @tx_declaration                       VARCHAR(256)        = NULL
    , @dec_auto_debit_req_min_amount        DECIMAL(20, 2)      = NULL
    , @tx_auto_debit_req_full_outstanding   VARCHAR(256)        = NULL
    , @tx_card_duplication_result           VARCHAR(1024)       = NULL
    , @tx_card_duplication_reason           VARCHAR(1024)       = NULL
    , @tx_un_sanction_result                VARCHAR(1024)       = NULL
    , @tx_un_sanction_reason                VARCHAR(1024)       = NULL
    , @tx_ofac_sanction_result              VARCHAR(1024)       = NULL
    , @tx_ofac_sanction_reason              VARCHAR(1024)       = NULL
    , @dec_applicant_asking_limit           DECIMAL(20, 2)      = NULL
    , @dec_max_allowd_limit                 DECIMAL(20, 2)      = NULL
    , @dec_approved_limit                   DECIMAL(20, 2)      = NULL
    , @dec_balance_transfer_request_amount  DECIMAL(20, 2)      = NULL
    , @dec_card_proposed_limit              DECIMAL(20, 2)      = NULL
    , @tx_proposed_billing_date             VARCHAR(256)        = NULL
    , @dec_minimum_payment                  DECIMAL(20, 2)      = NULL
    , @tx_bt_credit_card_outstanding        VARCHAR(256)        = NULL
    , @tx_kyc_level                         VARCHAR(256)        = NULL
    , @dec_auto_debit_amount                DECIMAL(20, 2)      = NULL
    , @dec_interest_rate                    DECIMAL(20, 2)      = NULL
    , @dt_cib_generation                    DATE                = NULL
    , @tx_cib_status                        VARCHAR(256)        = NULL
    , @dec_proposed_dbr                     DECIMAL(20, 2)      = NULL
    , @dec_net_monthly_income               DECIMAL(20, 2)      = NULL
    , @tx_current_type_based_on_card_nature VARCHAR(256)        = NULL
    , @tx_card_security_type                VARCHAR(256)        = NULL
    , @dec_allowed_muiltiplier              DECIMAL(20, 2)      = NULL
    , @dec_amout_deposite_cbbl              DECIMAL(20, 2)      = NULL
    , @dec_remaining_amount_after_paid_emi  DECIMAL(20, 2)      = NULL
    , @dec_disposable_income                DECIMAL(20, 2)      = NULL
    , @dec_existing_loan_emi                DECIMAL(20, 2)      = NULL
    , @dec_total_emi                        DECIMAL(20, 2)      = NULL
    , @tx_duplications                      VARCHAR(256)        = NULL
    , @tx_maximum_allowed_multiplier        VARCHAR(256)        = NULL
    , @dec_maximum_allowed_dbr              DECIMAL(20, 2)      = NULL
    , @dec_recommend_for_approval           DECIMAL(20, 2)      = NULL
    , @tx_bp_no                             VARCHAR(256)        = NULL
    , @tx_nid                               VARCHAR(256)        = NULL
    , @tx_mobile                            VARCHAR(256)        = NULL
    , @tx_from_date                         VARCHAR(256)        = NULL
    , @tx_to_date                           VARCHAR(256)        = NULL
    , @tx_sourcing_brc                      VARCHAR(256)        = NULL 
    , @tx_staff_id                          VARCHAR(256)        = NULL 
    , @id_legal_entity_key                  INT                 = NULL
    , @tx_ui_action_name                    VARCHAR(256)        = NULL
    , @tx_phone                             VARCHAR(256)        = NULL
    , @tx_concer_bank_name                  VARCHAR(256)        = NULL
    , @tx_bt_request                        VARCHAR(256)        = NULL
    , @tx_card_id_list                      VARCHAR(256)        = NULL
    , @tx_card_group_id                     VARCHAR(256)        = NULL

    _SP_PARAM_FOOTER

AS

{
    _SP_HEADER

        IF ( (@tx_action_name = 'LMS_HEAD_OFFICE_CARD_PDF') OR (@tx_action_name = 'LMS_BRANCH_CARD_PDF'))
    BEGIN   

        SELECT L.*, C.tx_value1 AS tx_card_type, A.tx_action_name AS tx_action_type
        INTO    #TEMP_CARD_TABLE
        FROM    T_CREDIT_CARD L WITH(NOLOCK)
        JOIN    T_CONFIGURATION C WITH(NOLOCK) ON C.id_configuration_key = L.id_card_type_key
        JOIN    T_FSM_ACTION A WITH(NOLOCK) ON A.id_fsm_action_key = L.id_action_key
        WHERE   id_credit_card_key = @id_credit_card_key
        AND     L.is_active = 1

        SELECT  tx_rs_type = 'RS_TYPE_CREDIT_CARD', TL.* FROM #TEMP_CARD_TABLE TL
        SELECT  tx_rs_type = 'RS_TYPE_CREDIT_CARD_2', TL.* FROM #TEMP_CARD_TABLE TL
        SELECT  tx_rs_type = 'RS_TYPE_CREDIT_CARD_3'
        , (SELECT tx_login_name FROM T_USER WITH(NOLOCK) WHERE id_user_key = @id_user_mod_key) AS tx_login_name
        , TL.* FROM #TEMP_CARD_TABLE TL

        SELECT tx_rs_type = 'RS_TYPE_REFERENCE'
        ,   TL.tx_reference_name
        ,   TL.tx_reference_email
        ,   TL.tx_reference_designation
        ,   TL.tx_reference_mobile
        ,   TL.tx_reference_name_of_organization
        ,   TL.tx_reference_telephone
        ,   TL.tx_reference_work_and_residence_address
        ,   TL.tx_reference_profesion
        ,   TL.tx_relationship_with_applicant
        FROM #TEMP_CARD_TABLE TL

        SELECT tx_rs_type = 'RS_TYPE_BRANCH_NAME_STUFF_ID'
        , tx_sourcing_staff_id AS tx_staffId
        , tx_sourcing_branch AS tx_staff_branch_name 
        FROM #TEMP_CARD_TABLE
        SELECT @id_customer_key = (SELECT id_customer_key FROM #TEMP_CARD_TABLE)

        SELECT  tx_rs_type = 'RS_TYPE_CUSTOMER' , C.* 
                ,(SELECT tx_value1  FROM T_CONFIGURATION WHERE id_configuration_key = C.id_customer_type_key) AS tx_customer_type
                ,TLP.tx_application_number      AS tx_application_no
                ,(SELECT tx_value1  FROM T_CONFIGURATION WHERE id_configuration_key = TLP.id_card_type_key) AS tx_card_type
                ,TLP.tx_card_security_type
                ,TLP.tx_account_no
                ,TLP.tx_sourcing_branch
                ,TLP.tx_sourcing_staff_id
                , TLP.tx_name_of_card AS tx_name_of_card
        FROM    T_CUSTOMER C
        JOIN    #TEMP_CARD_TABLE TLP ON TLP.id_customer_key = C.id_customer_key
        JOIN    T_USER U ON TLP.id_creator_key = U.id_user_key
        JOIN    T_LEGAL_ENTITY L ON U.id_legal_entity_key =  L.id_legal_entity_key
        WHERE   C.id_customer_key =  @id_customer_key
        AND     C.is_active = 1

        IF (@tx_action_name = 'LMS_HEAD_OFFICE_CARD_PDF')
        BEGIN 
            SELECT tx_rs_type = 'RS_TYPE_EXISTING_LIABILITY_CBBL' , L.* 
            INTO #TEMP_EXISTING_LIABILITY_CBBL
            FROM T_EXISTING_LIABILITY L
            WHERE id_credit_card_key = @id_credit_card_key 
            AND tx_group_name = 'CBBL'
            AND is_active = 1

            SELECT tx_rs_type = 'RS_TYPE_EXISTING_LIABILITY_OTHER_BANK' , L.* 
            INTO #TEMP_EXISTING_LIABILITY_OTHER_BANK
            FROM T_EXISTING_LIABILITY L
            WHERE id_credit_card_key = @id_credit_card_key 
            AND tx_group_name = 'Other Banks'
            AND is_active = 1

            SELECT tx_rs_type = 'RS_TYPE_EXISTING_LIABILITY_CBBL_TOTAL' 
            ,SUM(dec_disbursed) AS dec_disbursed
            ,SUM(dec_current_outstanding) AS dec_current_outstanding
            ,SUM(dec_emi_size) AS dec_emi_size
            INTO #TEMP_EXISTING_LIABILITY_CBBL_TOTAL
            FROM T_EXISTING_LIABILITY 
            WHERE id_credit_card_key = @id_credit_card_key 
            AND tx_group_name = 'CBBL'
            AND is_active = 1

            SELECT tx_rs_type = 'RS_TYPE_EXISTING_LIABILITY_TOTAL' 
            ,SUM(dec_disbursed) AS dec_disbursed
            ,SUM(dec_current_outstanding) AS dec_current_outstanding
            ,SUM(dec_emi_size) AS dec_emi_size
            INTO #TEMP_EXISTING_LIABILITY_TOTAL
            FROM T_EXISTING_LIABILITY 
            WHERE id_credit_card_key = @id_credit_card_key 
            AND is_active = 1

            IF EXISTS (SELECT  1 FROM #TEMP_EXISTING_LIABILITY_CBBL)
            BEGIN
                SELECT  * FROM #TEMP_EXISTING_LIABILITY_CBBL
            END
            ELSE
            BEGIN
                SELECT tx_rs_type = 'RS_TYPE_EXISTING_LIABILITY_CBBL' ,id_existing_liability_key = 0, dtt_mod = GETDATE(), id_credit_card_key = @id_credit_card_key, tx_bank_name = null, 
                tx_product_name = null, dec_disbursed = null, dec_current_outstanding = null,   dec_emi_size = null,    tx_remarks = null
            END

            IF EXISTS (SELECT  1 FROM #TEMP_EXISTING_LIABILITY_OTHER_BANK)
            BEGIN
                SELECT  * FROM #TEMP_EXISTING_LIABILITY_OTHER_BANK
            END
            ELSE
            BEGIN
                SELECT tx_rs_type = 'RS_TYPE_EXISTING_LIABILITY_OTHER_BANK' ,id_existing_liability_key = 0, dtt_mod = GETDATE(), id_credit_card_key = @id_credit_card_key, tx_bank_name = null, 
                tx_product_name = null, dec_disbursed = null, dec_current_outstanding = null,   dec_emi_size = null,    tx_remarks = null
            END

            IF EXISTS (SELECT  1 FROM #TEMP_EXISTING_LIABILITY_CBBL_TOTAL)
            BEGIN
                SELECT * , 'Total Exposure with CBBL' AS tx_bank_name, '' AS tx_remarks
                FROM #TEMP_EXISTING_LIABILITY_CBBL_TOTAL
            END
            ELSE
            BEGIN
                SELECT tx_rs_type = 'RS_TYPE_EXISTING_LIABILITY_CBBL_TOTAL' ,tx_bank_name = 'Total Exposure with CBBL', 
                 dec_disbursed = null, dec_current_outstanding = null,   dec_emi_size = null,    tx_remarks = ''
            END

            IF EXISTS (SELECT  1 FROM #TEMP_EXISTING_LIABILITY_TOTAL)
            BEGIN
                DECLARE @l_dec_disposable_income DECIMAL(20, 2) = (SELECT dec_disposable_income FROM #TEMP_CARD_TABLE)

                SELECT * , 'Existing Total' AS tx_bank_name, 
                'Disposable income- BDT' + CASE WHEN @l_dec_disposable_income = -2147483648.00 THEN '' ELSE CAST(@l_dec_disposable_income as varchar(32)) END AS tx_remarks
                FROM #TEMP_EXISTING_LIABILITY_TOTAL
            END
            ELSE
            BEGIN
                SELECT tx_rs_type = 'RS_TYPE_EXISTING_LIABILITY_TOTAL' ,tx_bank_name = 'Existing Total', 
                 dec_disbursed = null, dec_current_outstanding = null,   dec_emi_size = null,    tx_remarks = 'Disposable income- BDT'
            END

            SELECT  tx_rs_type = 'RS_TYPE_ANALYSTS_COMMENTS' , C.*
            INTO            #TEMP_ANALYSTS_COMMENTS
            FROM    T_COMMENT C
            WHERE   tx_object_type = 'CREDIT_CARD'
            AND     tx_comment_type = 'ANALYSTS_COMMENTS'
            AND     id_ref_key = @id_credit_card_key
            AND     is_active = 1

            IF EXISTS (SELECT  1 FROM #TEMP_ANALYSTS_COMMENTS)
            BEGIN
                SELECT  * FROM #TEMP_ANALYSTS_COMMENTS
            END
            ELSE
            BEGIN
                SELECT tx_rs_type = 'RS_TYPE_ANALYSTS_COMMENTS', id_comment_key = 0, dtt_mod = GETDATE(), id_ref_key = @id_credit_card_key,
                 tx_comment = null, tx_commented_by = null,  tx_object_type = null, tx_comment_type = null
            END

            SELECT  tx_rs_type = 'RS_TYPE_EXCEPTION_DETAILS' , C.*
            INTO    #TEMP_EXCEPTION_DETAILS
            FROM    T_COMMENT C
            WHERE   tx_object_type = 'CREDIT_CARD'
            AND     tx_comment_type = 'EXCEPTION_DETAILS'
            AND     id_ref_key = @id_credit_card_key
            AND     is_active = 1

            IF EXISTS (SELECT  1 FROM #TEMP_EXCEPTION_DETAILS)
            BEGIN
                SELECT  * FROM #TEMP_EXCEPTION_DETAILS
            END
            ELSE
            BEGIN
                SELECT tx_rs_type = 'RS_TYPE_EXCEPTION_DETAILS', id_comment_key = 0, dtt_mod = GETDATE(), id_ref_key = @id_credit_card_key,
                 tx_comment = null, tx_commented_by = null,  tx_object_type = null, tx_comment_type = null
            END

            SELECT  tx_rs_type = 'RS_TYPE_INSTRUCTION_TO_CAD' , C.*
            INTO    #TEMP_INSTRUCTION_TO_CAD
            FROM    T_COMMENT C
            WHERE   tx_object_type = 'CREDIT_CARD'
            AND     tx_comment_type = 'INSTRUCTION_TO_CAD'
            AND     id_ref_key = @id_credit_card_key
            AND     is_active = 1

            IF EXISTS (SELECT  1 FROM #TEMP_INSTRUCTION_TO_CAD)
            BEGIN
                SELECT  * FROM #TEMP_INSTRUCTION_TO_CAD
            END
            ELSE
            BEGIN
                SELECT tx_rs_type = 'RS_TYPE_INSTRUCTION_TO_CAD', id_comment_key = 0, dtt_mod = GETDATE(), id_ref_key = @id_credit_card_key,
                 tx_comment = null, tx_commented_by = null,  tx_object_type = null, tx_comment_type = null
            END
        END
        ELSE IF ( @tx_action_name = 'LMS_BRANCH_CARD_PDF' )
        BEGIN
            SELECT  tx_rs_type = 'RS_TYPE_DOCUMENT_CHECKLIST'
            ,tx_card_duplication_reason, tx_card_duplication_result, tx_un_sanction_reason, tx_un_sanction_result
            ,tx_ofac_sanction_reason, tx_ofac_sanction_result, tx_auto_debit_req_minimum_amount, tx_auto_debit_req_full_outstanding
            ,(SELECT CASE WHEN EXISTS(SELECT * FROM T_DOCUMENT WHERE id_ref_key = @id_credit_card_key AND tx_doc_type = 'NID') THEN 1 ELSE 0 END) AS tx_nid_upload_status
            ,(SELECT CASE WHEN EXISTS(SELECT * FROM T_DOCUMENT WHERE id_ref_key = @id_credit_card_key AND tx_doc_type = 'TIN') THEN 1 ELSE 0 END) AS tx_tin_upload_status
            ,(SELECT CASE WHEN EXISTS(SELECT * FROM T_DOCUMENT WHERE id_ref_key = @id_credit_card_key AND tx_doc_type = 'CIB_UNDERTAKING') THEN 1 ELSE 0 END) AS tx_cib_undertaking_upload_status
            ,(SELECT CASE WHEN EXISTS(SELECT * FROM T_DOCUMENT WHERE id_ref_key = @id_credit_card_key AND tx_doc_type = 'LETTER_OF_INTRODUCTION(LOI)') THEN 1 ELSE 0 END) AS tx_loi_upload_status
            ,(SELECT CASE WHEN EXISTS(SELECT * FROM T_DOCUMENT WHERE id_ref_key = @id_credit_card_key AND tx_doc_type = 'SALARY_STATEMENT') THEN 1 ELSE 0 END) AS tx_salary_statement_upload_status
            ,(SELECT CASE WHEN EXISTS(SELECT * FROM T_DOCUMENT WHERE id_ref_key = @id_credit_card_key AND tx_doc_type = 'REFERENCE_DETAILS') THEN 1 ELSE 0 END) AS tx_reference_upload_status
            ,(SELECT CASE WHEN EXISTS(SELECT * FROM T_DOCUMENT WHERE id_ref_key = @id_credit_card_key AND tx_doc_type = 'BP/CIV_ID_DOCUMENTS_COPY') THEN 1 ELSE 0 END) AS tx_civ_upload_status
            ,(SELECT CASE WHEN EXISTS(SELECT * FROM T_DOCUMENT WHERE id_ref_key = @id_credit_card_key AND tx_doc_type = 'VALID_PASSPORT_DUAL_CARD') THEN 1 ELSE 0 END) AS tx_passport_upload_status
            ,(SELECT CASE WHEN EXISTS(SELECT * FROM T_DOCUMENT WHERE id_ref_key = @id_credit_card_key AND tx_doc_type = 'SECURITY_DOC_SECURE_CARD') THEN 1 ELSE 0 END) AS tx_security_doc_upload_status
            ,(SELECT CASE WHEN (EXISTS(SELECT * FROM T_DOCUMENT WHERE id_ref_key = @id_credit_card_key AND tx_doc_type = 'PASSPORT_SIZE_PHOTO_1') AND EXISTS(SELECT * FROM T_DOCUMENT WHERE id_ref_key = @id_credit_card_key AND tx_doc_type = 'PASSPORT_SIZE_PHOTO_2')) THEN 1 ELSE 0 END) AS tx_pp_photo_upload_status
            ,(SELECT CASE WHEN (EXISTS(SELECT * FROM T_DOCUMENT WHERE id_ref_key = @id_credit_card_key AND tx_doc_type = 'SUPPLEMENTARY_APPLICANT_NID') AND EXISTS(SELECT * FROM T_DOCUMENT WHERE id_ref_key = @id_credit_card_key AND tx_doc_type = 'SUPPLEMENTARY_APPLICANT_PHOTO')) THEN 1 ELSE 0 END) AS tx_supplementary_applicant_upload_status
             FROM #TEMP_CARD_TABLE

            SELECT tx_rs_type = 'RS_TYPE_COMMENTS_DEVIATION' ,* 
            INTO #TEMP_COMMENTS_DEVIATION
            FROM T_COMMENT
            WHERE id_ref_key = @id_credit_card_key
            AND tx_object_type = 'CREDIT_CARD'
            AND tx_comment_type = 'COMMENTS_DEVIATION'
            AND is_active = 1
            ORDER BY id_comment_key ASC

            IF EXISTS (SELECT  1 FROM #TEMP_COMMENTS_DEVIATION)
            {
                SELECT  * FROM #TEMP_COMMENTS_DEVIATION
            }
            ELSE
            {
                SELECT tx_rs_type = 'RS_TYPE_COMMENTS_DEVIATION', id_comment_key = 0, dtt_mod = GETDATE(), id_ref_key = @id_credit_card_key, tx_comment = null, tx_commented_by = null,  tx_object_type = null, tx_comment_type = null
            }
        END 
    END 

    IF (@tx_action_name = 'HOC_EXCEL_REPORT')
    {      

           CREATE TABLE #T_TMP_CARD (
                credit_card_id INT NULL
            )

            INSERT INTO #T_TMP_CARD
            SELECT credit_card_id = splitdata FROM dbo.fnSplitString(@tx_card_id_list, ',')
            
            SELECT tx_rs_type = 'RS_TYPE_LMS_MIS_PPC_EXCEL_REPORT'
            , L.*
            , CUST.*
            , tx_card_current_status    = ST.tx_state_name
            , tx_legal_entity_name      = LE.tx_legal_entity_name
            , tx_card_creator           = U.tx_login_name
            , tx_card_type              = CON.tx_value1
            , tx_user_name              = (
                    SELECT TOP 1 U.tx_first_name + ' ' + U.tx_last_name
                    FROM T_USER         U
                    JOIN T_CREDIT_CARD_AUDIT   A   ON A.id_user_mod_key    = U.id_user_key
                    JOIN T_FSM_STATE    ST  ON ST.id_fsm_state_key  = A.id_state_key
                    WHERE A.id_credit_card_key = L.id_credit_card_key
                    AND ST.tx_state_name IN('C_OFFICER_RECOMMENDED','C_OFFICER_UPDATED')
                    ORDER BY A.dtt_mod DESC
                )
            , tx_state_map = (
                    SELECT (
                        STUFF(
                            (
                                SELECT '@' + s.tx_state_name + ',' + convert(varchar, A.dtt_mod, 20)
                                FROM T_CREDIT_CARD_AUDIT   A WITH(NOLOCK)
                                JOIN T_FSM_STATE    S ON S.id_fsm_state_key = A.id_state_key
                                WHERE A.id_credit_card_key = L.id_credit_card_key
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
                            WHERE c.id_ref_key = L.id_credit_card_key
                            AND c.tx_object_type IN ('CREDIT_CARD_ACTION_COMMENT') 
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
                            WHERE c.id_ref_key = L.id_credit_card_key
                            AND c.tx_object_type IN ('CREDIT_CARD_ACTION_COMMENT') 
                            AND c.tx_comment_type = 'CA_SEND_QUERY_COMMENT'
                            FOR XML PATH('')
                        ), 1, 2, '')
                        )
                )
            FROM T_CREDIT_CARD             L
            JOIN T_CUSTOMER         CUST    ON CUST.id_customer_key     = L.id_customer_key 
            JOIN T_CONFIGURATION    CON     ON CON.id_configuration_key = L.id_card_type_key
            JOIN T_FSM_STATE        ST      ON ST.id_fsm_state_key      = L.id_state_key
            JOIN T_USER             U       ON U.id_user_key            = L.id_creator_key
            JOIN T_LEGAL_ENTITY     LE      ON LE.id_legal_entity_key   = U.id_legal_entity_key
            WHERE EXISTS (SELECT credit_card_id FROM #T_TMP_CARD WHERE credit_card_id = L.id_credit_card_key)
    } 

    IF (@tx_action_name = 'LMS_CARD_EXCEL_REPORT')
    {

           DECLARE @l_tmp_tx varchar(2048) = '?'
           DECLARE @l_tmp_dt datetime = null

           CREATE TABLE #T_TMP_CARD3 (
                card_id INT NULL
            )

            INSERT INTO #T_TMP_CARD3
            SELECT card_id = splitdata FROM dbo.fnSplitString(@tx_card_id_list, ',')

            SELECT 
             L.id_credit_card_key
            , CUST.*
            , tx_card_current_status    = ST.tx_state_name
            , tx_card_type              = CFG.tx_value1
            , tx_customer_type          = CON1.tx_value1
            , tx_card_creator           = ur.tx_login_name
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
            INTO #T_REPORT
            FROM T_CREDIT_CARD      L
            JOIN #T_TMP_CARD3       TL      ON TL.card_id                 = L.id_credit_card_key
            JOIN T_CUSTOMER         CUST    ON CUST.id_customer_key       = L.id_customer_key
            JOIN T_USER             ur      ON ur.id_user_key             = L.id_creator_key
            JOIN T_FSM_STATE        ST      ON ST.id_fsm_state_key        = L.id_state_key
            JOIN T_CONFIGURATION    CFG     ON CFG.id_configuration_key   = L.id_card_type_key
            JOIN T_CONFIGURATION    CON1    ON CON1.id_configuration_key  = L.id_customer_type_key

            -- dtt_crm_received_date            

            UPDATE  #T_REPORT
            SET     dtt_crm_received_date =  (  SELECT  MAX(AUD.dtt_mod) 
                                                FROM    T_CREDIT_CARD_AUDIT    AUD
                                                JOIN    T_FSM_STATE     FST ON FST.id_fsm_state_key = AUD.id_state_key
                                                AND     FST.tx_state_name IN('CARD_RECEIVED')
                                                AND     AUD.id_credit_card_key     = TMP.id_credit_card_key
                                            )
            FROM    #T_REPORT       TMP
            
            -- tx_analyst
            UPDATE  #T_REPORT
            SET     tx_analyst            = ( SELECT  MAX(ur.tx_first_name + ' ' + ur.tx_last_name)
                                                FROM .T_CREDIT_CARD_AUDIT  AUD
                                                JOIN    T_USER          ur  on ur.id_user_key       = AUD.id_user_mod_key
                                                JOIN    T_FSM_STATE     FST ON FST.id_fsm_state_key = AUD.id_state_key                                              
                                                AND     FST.tx_state_name IN('CA_RECOMMENDED','CA_UPDATED')
                                                AND     AUD.id_credit_card_key     = TMP.id_credit_card_key
            )
            FROM    #T_REPORT       TMP

            --tx_user_name
            UPDATE  #T_REPORT
            SET     tx_user_name = ( SELECT  MAX(ur.tx_first_name + ' ' + ur.tx_last_name)
                                                FROM .T_CREDIT_CARD_AUDIT  AUD
                                                JOIN    T_USER          ur  on ur.id_user_key       = AUD.id_user_mod_key
                                                JOIN    T_FSM_STATE     FST ON FST.id_fsm_state_key = AUD.id_state_key                                              
                                                AND     FST.tx_state_name IN('C_OFFICER_RECOMMENDED','C_OFFICER_UPDATED') 
                                                AND     AUD.id_credit_card_key     = TMP.id_credit_card_key
            )
            FROM    #T_REPORT       TMP     
            
            -- dtt_of_query
            UPDATE  #T_REPORT
            SET     dtt_of_query =  (   SELECT  MAX(AUD.dtt_mod) 
                                                FROM    T_CREDIT_CARD_AUDIT    AUD
                                                JOIN    T_FSM_STATE     FST ON FST.id_fsm_state_key = AUD.id_state_key
                                                AND     FST.tx_state_name IN('CA_QUERY_TO_C_OFFICER')
                                                AND     AUD.id_credit_card_key     = TMP.id_credit_card_key
                                            )
            FROM    #T_REPORT       TMP     

            -- dtt_return_to_source_date
            UPDATE  #T_REPORT
            SET     dtt_return_to_source_date = ( SELECT  MAX(AUD.dtt_mod) 
                                                FROM    T_CREDIT_CARD_AUDIT    AUD
                                                JOIN    T_FSM_STATE     FST ON FST.id_fsm_state_key = AUD.id_state_key
                                                AND     FST.tx_state_name IN('CA_RETURNED')
                                                AND     AUD.id_credit_card_key     = TMP.id_credit_card_key
                                            )
            FROM    #T_REPORT       TMP

            --tx_analyst_comments
            UPDATE  #T_REPORT 
            SET tx_analyst_comments = (
            SELECT TOP 1 C.tx_comment
                FROM T_COMMENT C
                WHERE tx_object_type = 'CREDIT_CARD'
                AND tx_comment_type = 'ANALYSTS_COMMENTS'               
                AND id_ref_key = TMP.id_credit_card_key
                AND is_active = 1
            )
            FROM    #T_REPORT TMP
                
            -- dtt_approved_date
            UPDATE  #T_REPORT
            SET     dtt_approved_date = (   SELECT  MAX(AUD.dtt_mod) 
                                                FROM    T_CREDIT_CARD_AUDIT    AUD
                                                JOIN    T_FSM_STATE     FST ON FST.id_fsm_state_key = AUD.id_state_key
                                                AND     FST.tx_state_name LIKE '%APPROVED%'
                                                AND     AUD.id_credit_card_key     = TMP.id_credit_card_key
                                            )
            FROM    #T_REPORT       TMP
            
            -- dtt_sent_to_cad
            UPDATE  #T_REPORT
            SET     dtt_sent_to_cad = ( SELECT  MAX(AUD.dtt_mod) 
                                                FROM    T_CREDIT_CARD_AUDIT    AUD
                                                JOIN    T_FSM_STATE     FST ON FST.id_fsm_state_key = AUD.id_state_key
                                                AND     FST.tx_state_name ='SENT_TO_CO'
                                                AND     AUD.id_credit_card_key     = TMP.id_credit_card_key
                                            )
            FROM    #T_REPORT       TMP
                
            SELECT tx_rs_type = 'RS_TYPE_LMS_CARD_EXCEL_REPORT', TR.* , TL.*
            FROM #T_REPORT TR
            join T_CREDIT_CARD TL ON TL.id_credit_card_key =TR.id_credit_card_key          
    }

    IF(@tx_action_name ='LMS_CARD_MEMO_REPORT_PDF')
    {

        SELECT C.tx_customer_name 
            , C.tx_bp_no
            , C.tx_designation
            , CC.dec_approved_limit
            , (CC.dec_approved_limit * 3) / 100 AS dec_3_percent_of_approve_limit
            , CC.dec_salary_deposited_last_month
            , (SELECT SUM(dec_emi_size) FROM T_EXISTING_LIABILITY WITH(NOLOCK) WHERE id_credit_card_key = CC.id_credit_card_key AND tx_group_name ='CBBL') AS dec_cbbl_emi
            , CC.dec_remaining_emi
            , CC.dt_cib_generation
            , CC.tx_cib_status
            , CON.tx_value1 AS tx_card_type
        INTO #TEMP_MEMO_REPORT_DATA
        FROM T_CREDIT_CARD CC WITH(NOLOCK)
        JOIN T_CUSTOMER C WITH(NOLOCK) ON C.id_customer_key = CC.id_customer_key
        JOIN T_CONFIGURATION CON WITH(NOLOCK) ON CON.id_configuration_key = CC.id_card_type_key
        WHERE CC.tx_card_group_id = @tx_card_group_id -- WE WILL PASS tx_card_group_id FROM GUI IN API CALL

        SELECT tx_rs_type = 'RS_TYPE_CARD_VIEW_MEMO', * FROM #TEMP_MEMO_REPORT_DATA

        SELECT tx_rs_type = 'RS_TYPE_TOTAL_AMOUNT_FILE'
            , SUM(CASE WHEN tx_bp_no IS NOT NULL THEN 1 ELSE 0 END) AS count_police_file
            , SUM(CASE WHEN tx_bp_no IS NOT NULL THEN 0 ELSE 1 END) AS count_staff_file
            , COUNT(1) AS count_total_file
            , SUM(CASE WHEN tx_bp_no IS NOT NULL THEN dec_approved_limit ELSE 0 END) AS total_approved_limit_police
            , SUM(CASE WHEN tx_bp_no IS NOT NULL THEN 0 ELSE dec_approved_limit END) AS total_approved_limit_staff
            , SUM(CASE WHEN dec_approved_limit = -2147483648.00 OR dec_approved_limit IS NULL THEN 0 ELSE dec_approved_limit END) AS total_approved_limit
        FROM #TEMP_MEMO_REPORT_DATA
    }


    _SP_FOOTER
}
go

_GRANT_PERM_SP