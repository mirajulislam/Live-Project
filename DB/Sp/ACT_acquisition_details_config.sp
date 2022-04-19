/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Mirajul.islam
* Date          : 01 JAN 2022
* Description   : 
*****************************************************************************************/
    

EXEC DROP_db_object @tx_db_object_type = 'P', @tx_db_object_name = 'ACT_acquisition_details_config'
    go

IF ('CREATE' = 'CREATE')
        PRINT '**** WARNING : CREATING SP ****'
    ELSE IF ('CREATE' = 'ALTER')
        PRINT '**** WARNING : ALTER SP ****'
    ELSE
        PRINT '**** WARNING : UNKNOWN TABLE PROC ****'
    go

    CREATE PROC ACT_acquisition_details_config
    
    @tx_action_name     varchar(32)     = NULL  OUTPUT

    , @is_active            int                     = 1
    , @id_env_key           int                     = NULL  OUTPUT
    , @id_user_mod_key      int                     = NULL  OUTPUT
    , @dtt_mod              datetime                = NULL  OUTPUT

    , @id_state_key         int                     = NULL  OUTPUT
    , @tx_state_name        varchar(64) = NULL  OUTPUT
    , @id_action_key        int                     = NULL  OUTPUT

    , @id_event_key         int                     = NULL  OUTPUT
    , @id_event_map1_key    int                     = NULL  OUTPUT
    , @id_event_map2_key    int                     = NULL  OUTPUT
    , @id_event_map3_key    int                     = NULL  OUTPUT
    , @id_event_map4_key    int                     = NULL  OUTPUT

    , @dtt_valid_from       datetime                = NULL
    , @dtt_valid_to         datetime                = NULL
    , @dtt_as_at            datetime                = NULL
    , @dtt_last_refresh     datetime                = NULL

    ,  @id_acquisition_details_config_key                                        INT                         = NULL
    ,  @id_acquisition_details_config_ver                                            INT                         = NULL

    ,  @dtt_create                                          DATETIME                    = NULL  
    ,  @id_creator_key                                      INT                         = NULL
    ,  @id_acquisition_applicant_key                        INT                         = NULL
    ,  @tx_organization_name                                VARCHAR(256)                = NULL
    ,  @tx_designation                                      VARCHAR(256)                = NULL
    ,  @dec_service_length                                  DECIMAL(20, 2)              = NULL
    ,  @tx_loan_type                                        VARCHAR(256)                = NULL
    ,  @tx_financial_institution_name                       VARCHAR(256)                = NULL
    ,  @tx_loanacno_or_card_no                              VARCHAR(256)                = NULL
    ,  @dec_sanction_limit                                  DECIMAL(20, 2)              = NULL
    ,  @tx_validity                                         VARCHAR(256)                = NULL
    ,  @dec_present_out_standing                            DECIMAL(20, 2)              = NULL
    ,  @dec_emi                                             DECIMAL(20, 2)              = NULL
    ,  @tx_account_title                                    VARCHAR(256)                = NULL
    ,  @tx_bank_name                                        VARCHAR(256)                = NULL
    ,  @tx_branch_name                                      VARCHAR(256)                = NULL
    ,  @tx_account_no                                       VARCHAR(256)                = NULL
    ,  @tx_security_type                                    VARCHAR(256)                = NULL
    ,  @tx_beneficiary                                      VARCHAR(256)                = NULL
    ,  @dec_rate                                            DECIMAL(20, 2)              = NULL
    ,  @tx_ac_instrument_no                                 VARCHAR(256)                = NULL
    ,  @dtt_issue_date                                      DATETIME                    = NULL
    ,  @tx_face_value                                       VARCHAR(256)                = NULL
    ,  @tx_present_value                                    VARCHAR(256)                = NULL
    ,  @tx_company_name                                     VARCHAR(256)                = NULL
    ,  @tx_main_address                                     VARCHAR(256)                = NULL
    ,  @tx_additional_address                               VARCHAR(256)                = NULL
    ,  @tx_availing_any_loan_this_company                   VARCHAR(256)                = NULL
    ,  @tx_name_of_company_bank                             VARCHAR(256)                = NULL
    ,  @tx_branch_of_company_bank                           VARCHAR(256)                = NULL
    ,  @tx_object_type                                      VARCHAR(256)                = NULL
    ,  @tx_inputed_by                                       VARCHAR(256)                = NULL
    ,  @tx_group                                            VARCHAR(256)                = NULL
    ,  @tx_sub_group                                        VARCHAR(256)                = NULL

    , @is_sel_data          int                     = NULL
    , @tx_log_level         varchar(32)         = NULL
    , @id_log_level         int                     = NULL
    , @is_record_time       bit                     = NULL
    , @is_print_msg         bit                     = NULL
    , @is_persist_msg       bit                     = NULL
    , @tx_json_log_msg      varchar(MAX)    = NULL      OUTPUT

AS

BEGIN
    -- GLOBAL VARS --
    DECLARE   @g_tx_action_name_orig    varchar(32)
            , @g_tx_state_name_orig     varchar(64)

            , @g_id_env_key             int
            , @g_tx_env_name            varchar(256)

            , @g_ct_row                 int
            , @g_id_return_status       int

            , @g_id_error_key           int
            , @g_tx_err_msg             varchar(1024)
            , @g_tx_err_msg_tmp         varchar(1024)
            , @g_is_outer_sp            bit

    DECLARE   @g_dt_sys_today           date
            , @g_dt_sys_prev_day        date
            , @g_dt_sys_next_day        date
            , @g_dt_sys_prev_biz_day    date
            , @g_dt_sys_next_biz_day    date

    

    --  DECLARE @g_in_tran      int
    DECLARE @g_is_ext_txn   bit
    DECLARE @g_is_sp_txn    bit

    SELECT @g_is_ext_txn = 0, @g_is_sp_txn = 0

    DECLARE @g_tmp_int      int

    DECLARE   @g_dtt_log            datetime
            , @g_tx_tmp_log_msg     varchar(MAX)
            , @g_tx_log_msg         varchar(MAX)

            , @g_id_err_num         int
            , @g_id_err_sev         int
            , @g_id_err_state       int
            , @g_tx_sp_name         varchar(128)
            , @g_id_line_num        int
            , @g_id_log_level       int

            , @g_is_record_time     bit
            , @g_is_print_msg       bit
            , @g_is_persist_msg     bit

            , @g_tx_json_log_msg    varchar(MAX)

    SELECT  @g_tx_json_log_msg = ''

    DECLARE @g_dtt_proc_start       datetime
    DECLARE @g_dtt_proc_end         datetime
    DECLARE @g_dtt_tot_elapsed      int

    DECLARE @g_dtt_query_start      datetime
    DECLARE @g_dtt_query_end        datetime
    DECLARE @g_dtt_query_elapsed    int

    DECLARE @g_tmp_tx_tot_time      varchar(255)
    DECLARE @g_tmp_tx_query_time    varchar(255)

    IF ( (@@NESTLEVEL = 1) )
    BEGIN
        IF ( ((@@OPTIONS & 2) != 2) AND (@@TRANCOUNT = 0) )
        BEGIN
            SELECT @g_is_ext_txn = 0
        END
        ELSE
        BEGIN
            SELECT @g_is_ext_txn = 1
        END
    END

    IF (((@tx_log_level IS NULL) OR (@tx_log_level = '?')) OR ((@is_persist_msg IS NULL) OR (@is_persist_msg = -2147483648)) OR ((@is_record_time IS NULL) OR (@is_record_time = -2147483648)))
    BEGIN
        EXEC @g_id_return_status = GET_sp_log_level @tx_sp_name='ACT_acquisition_details_config', @tx_log_level=@tx_log_level OUTPUT, @id_log_level=@id_log_level OUTPUT, @is_record_time=@is_record_time OUTPUT, @is_print_msg=@is_print_msg OUTPUT, @is_persist_msg=@is_persist_msg OUTPUT
    END

    SELECT @g_is_record_time = @is_record_time, @g_is_print_msg = @is_print_msg, @g_is_persist_msg  = @is_persist_msg, @g_id_log_level = @id_log_level

    SELECT @g_tx_err_msg = 'Entering[ACT_acquisition_details_config] : @tx_action[' + ISNULL(@tx_action_name, '?') + ']'
    SELECT @g_dtt_log = GETDATE(), @g_tx_sp_name = 'ACT_acquisition_details_config.sp', @g_id_line_num = 174

    -- TODO_H : [Naz] Move to Function

    IF ( NOT (((@g_id_log_level IS NULL) OR (@g_id_log_level = -2147483648))) )
    BEGIN
        IF (2 >= @g_id_log_level)
        BEGIN
            IF (@g_is_print_msg = 1)
            BEGIN
                SELECT @g_tx_tmp_log_msg = '[' + @g_tx_sp_name + ':' + convert(varchar, @g_id_line_num) + '] | ' + convert(varchar, @g_dtt_log) + ' | ' + 'INFO ' + ' | ' + '?' + ' | [' + convert(varchar, 0) + '] -> ' + ISNULL(@g_tx_err_msg, '?')
                PRINT  @g_tx_tmp_log_msg
            END

            IF ( (@g_is_persist_msg = 1) )
            BEGIN
                EXEC @g_id_return_status = ACT_msg_log   @tx_action_name = 'NEW', @id_env_key = @g_id_env_key, @id_user_mod_key = @id_user_mod_key, @dtt_mod = @g_dtt_log
                                                       , @id_state_key = @id_state_key, @id_action_key = @id_action_key, @tx_log_msg_type='?', @tx_log_level='INFO ', @id_log_level=2
                                                       , @tx_sp_name=@g_tx_sp_name, @id_line_num=@g_id_line_num, @id_err_code=0, @tx_log_msg=@g_tx_err_msg, @tx_json_log_msg = @tx_json_log_msg OUTPUT
            
                IF (@g_id_return_status != 0)
                BEGIN
                    RAISERROR ('Error calling ACT_msg_log', 16, 1)
                    IF (@g_is_sp_txn = 1)
                    BEGIN
                        SELECT @g_is_sp_txn = 0
                        ROLLBACK TRANSACTION
                
                        IF ( (@@NESTLEVEL = 1) )
                        BEGIN
                            EXEC @g_id_return_status = ACT_msg_log @tx_action_name = 'LOG_JSON', @tx_json_log_msg = @tx_json_log_msg, @ct_nestlevel = @@NESTLEVEL
                    
                            IF (@g_id_return_status != 0)
                            BEGIN
                                PRINT 'ERROR SAVING JSON LOG MSG!'
                            END
                        END
                    END
                    IF ( (@@NESTLEVEL = 1) AND (@g_is_ext_txn = 1) )
                    BEGIN
                        -- SELECT @tx_json_log_msg = 'JSON_LOG:[' + @tx_json_log_msg + ']'
                
                        IF (30008 = 0)
                        BEGIN
                            --RAISERROR (@tx_json_log_msg, 10, 1)
                            EXEC SYS_split_raise_error @tx_data_orig = @tx_json_log_msg, @tx_separator = 'DB_NEW_LINE', @id_severity_key = 10
                
                        END
                        ELSE
                        BEGIN
                            --RAISERROR (@tx_json_log_msg, 16, 1)
                            EXEC SYS_split_raise_error @tx_data_orig = @tx_json_log_msg, @tx_separator = 'DB_NEW_LINE', @id_severity_key = 16
                        END
                    END
                
                    RETURN 30008
                END
            END
        END
    END

    IF (((@id_env_key IS NULL) OR (@id_env_key = -2147483648)) AND @tx_action_name != 'LOGIN')
    BEGIN
        EXEC @g_id_return_status = GET_environment @id_env_key = @id_env_key OUTPUT, @tx_env_name   = @g_tx_env_name OUTPUT, @id_user_key = @id_user_mod_key

        SELECT @g_tx_err_msg = 'Error calling SP -> [GET_ENVIRONMENT] '
        IF (@g_id_return_status != 0)
        BEGIN
            RAISERROR (@g_tx_err_msg, 16, 1)
            IF (@g_is_sp_txn = 1)
            BEGIN
                SELECT @g_is_sp_txn = 0
                ROLLBACK TRANSACTION
        
                IF ( (@@NESTLEVEL = 1) )
                BEGIN
                    EXEC @g_id_return_status = ACT_msg_log @tx_action_name = 'LOG_JSON', @tx_json_log_msg = @tx_json_log_msg, @ct_nestlevel = @@NESTLEVEL
            
                    IF (@g_id_return_status != 0)
                    BEGIN
                        PRINT 'ERROR SAVING JSON LOG MSG!'
                    END
                END
            END
            IF ( (@@NESTLEVEL = 1) AND (@g_is_ext_txn = 1) )
            BEGIN
                -- SELECT @tx_json_log_msg = 'JSON_LOG:[' + @tx_json_log_msg + ']'
        
                IF (30001 = 0)
                BEGIN
                    --RAISERROR (@tx_json_log_msg, 10, 1)
                    EXEC SYS_split_raise_error @tx_data_orig = @tx_json_log_msg, @tx_separator = 'DB_NEW_LINE', @id_severity_key = 10
        
                END
                ELSE
                BEGIN
                    --RAISERROR (@tx_json_log_msg, 16, 1)
                    EXEC SYS_split_raise_error @tx_data_orig = @tx_json_log_msg, @tx_separator = 'DB_NEW_LINE', @id_severity_key = 16
                END
            END
        
            RETURN 30001
        END
    END

    SELECT @g_id_env_key = @id_env_key

    IF (((@dtt_mod IS NULL) OR (@dtt_mod = '01/01/1970')))
    BEGIN
        SELECT @dtt_mod = GETDATE()
    END

    IF (@tx_action_name != 'LOGIN')
    BEGIN
        IF (((@id_user_mod_key IS NULL) OR (@id_user_mod_key = -2147483648)))
        BEGIN
            RAISERROR ('Error:Int [@id_user_mod_key] should not be NULL', 16, 1)
            IF (@g_is_sp_txn = 1)
            BEGIN
                SELECT @g_is_sp_txn = 0
                ROLLBACK TRANSACTION
        
                IF ( (@@NESTLEVEL = 1) )
                BEGIN
                    EXEC @g_id_return_status = ACT_msg_log @tx_action_name = 'LOG_JSON', @tx_json_log_msg = @tx_json_log_msg, @ct_nestlevel = @@NESTLEVEL
            
                    IF (@g_id_return_status != 0)
                    BEGIN
                        PRINT 'ERROR SAVING JSON LOG MSG!'
                    END
                END
            END
            IF ( (@@NESTLEVEL = 1) AND (@g_is_ext_txn = 1) )
            BEGIN
                -- SELECT @tx_json_log_msg = 'JSON_LOG:[' + @tx_json_log_msg + ']'
        
                IF (30011 = 0)
                BEGIN
                    --RAISERROR (@tx_json_log_msg, 10, 1)
                    EXEC SYS_split_raise_error @tx_data_orig = @tx_json_log_msg, @tx_separator = 'DB_NEW_LINE', @id_severity_key = 10
        
                END
                ELSE
                BEGIN
                    --RAISERROR (@tx_json_log_msg, 16, 1)
                    EXEC SYS_split_raise_error @tx_data_orig = @tx_json_log_msg, @tx_separator = 'DB_NEW_LINE', @id_severity_key = 16
                END
            END
        
            RETURN 30011
        END
    END

    -- X_SET_NULL_ACTION

    SELECT  @g_tx_action_name_orig = @tx_action_name

     IF (((@dtt_mod IS NULL) OR (@dtt_mod = '01/01/1970')))
      BEGIN
        SELECT @dtt_mod = GETDATE()
      END

       IF ( @tx_action_name = 'NEW')
    BEGIN
        INSERT INTO T_ACQUISITION_DETAILS_CONFIG
        (     
                    id_acquisition_details_config_ver

                ,   is_active
                ,   id_env_key
                ,   id_user_mod_key
                ,   dtt_mod
                ,   dtt_create
                ,   id_event_key
                ,   id_creator_key

                ,   id_acquisition_applicant_key
                ,   tx_organization_name
                ,   tx_designation
                ,   dec_service_length
                ,   tx_loan_type
                ,   tx_financial_institution_name
                ,   tx_loanacno_or_card_no
                ,   dec_sanction_limit
                ,   tx_validity
                ,   dec_present_out_standing
                ,   dec_emi
                ,   tx_account_title
                ,   tx_bank_name
                ,   tx_branch_name
                ,   tx_account_no
                ,   tx_security_type
                ,   tx_beneficiary
                ,   dec_rate
                ,   tx_ac_instrument_no
                ,   dtt_issue_date
                ,   tx_face_value
                ,   tx_present_value
                ,   tx_company_name
                ,   tx_main_address
                ,   tx_additional_address
                ,   tx_availing_any_loan_this_company
                ,   tx_name_of_company_bank
                ,   tx_branch_of_company_bank
                ,   tx_object_type
                ,   tx_inputed_by
                ,   tx_group
                ,   tx_sub_group
        )
         VALUES
        (
                0

                ,  1
                ,  100000 
                ,  ISNULL(@id_user_mod_key                      ,-2147483648) 
                ,  ISNULL(@dtt_mod                              ,GETDATE()) 
                ,  ISNULL(@dtt_create                           ,GETDATE())    
                ,  ISNULL(@id_event_key                         ,-2147483648)  
                ,  ISNULL(@id_creator_key                       ,-2147483648)
                ,  ISNULL(@id_acquisition_applicant_key         ,-2147483648)                         
                ,  ISNULL(@tx_organization_name                 ,'?')                 
                ,  ISNULL(@tx_designation                       ,'?')             
                ,  ISNULL(@dec_service_length                   ,-2147483648)                                            
                ,  ISNULL(@tx_loan_type                         ,'?')         
                ,  ISNULL(@tx_financial_institution_name        ,'?')                             
                ,  ISNULL(@tx_loanacno_or_card_no                ,'?')                     
                ,  ISNULL(@dec_sanction_limit                   ,-2147483648)                 
                ,  ISNULL(@tx_validity                          ,'?')         
                ,  ISNULL(@dec_present_out_standing             ,-2147483648)                     
                ,  ISNULL(@dec_emi                              ,-2147483648)                        
                ,  ISNULL(@tx_account_title                     ,'?')             
                ,  ISNULL(@tx_bank_name                         ,'?')         
                ,  ISNULL(@tx_branch_name                       ,'?')             
                ,  ISNULL(@tx_account_no                        ,'?')             
                ,  ISNULL(@tx_security_type                     ,'?')             
                ,  ISNULL(@tx_beneficiary                       ,'?')             
                ,  ISNULL(@dec_rate                             ,-2147483648)     
                ,  ISNULL(@tx_ac_instrument_no                  ,'?')                 
                ,  ISNULL(@dtt_issue_date                       ,'01/01/1970')             
                ,  ISNULL(@tx_face_value                        ,'?')             
                ,  ISNULL(@tx_present_value                     ,'?')             
                ,  ISNULL(@tx_company_name                      ,'?')             
                ,  ISNULL(@tx_main_address                      ,'?')             
                ,  ISNULL(@tx_additional_address                ,'?')                     
                ,  ISNULL(@tx_availing_any_loan_this_company    ,'?')                                 
                ,  ISNULL(@tx_name_of_company_bank              ,'?')                     
                ,  ISNULL(@tx_branch_of_company_bank            ,'?')                         
                ,  ISNULL(@tx_object_type                       ,'?')                 
                ,  ISNULL(@tx_inputed_by                        ,'?')             
                ,  ISNULL(@tx_group                             ,'?')     
                ,  ISNULL(@tx_sub_group                         ,'?')         
        )   
        SELECT @id_acquisition_details_config_key = IDENT_CURRENT('T_ACQUISITION_DETAILS_CONFIG')         
    END
    IF( @tx_action_name = 'UPDATE' )
    BEGIN
        if(@id_acquisition_details_config_ver IS NULL)
        BEGIN
             SELECT @id_acquisition_details_config_ver = (SELECT id_acquisition_details_config_ver FROM T_ACQUISITION_DETAILS_CONFIG WHERE id_acquisition_details_config_key = @id_acquisition_details_config_key)
     
        END

        UPDATE T_ACQUISITION_DETAILS_CONFIG
        SET
          id_acquisition_details_config_ver                               =    @id_acquisition_details_config_ver+1

        ,   is_active                         =    ISNULL(@is_active                        ,  is_active) 
        ,   id_env_key                        =    ISNULL(@id_env_key                       ,  id_env_key)    
        ,   id_user_mod_key                   =    ISNULL(@id_user_mod_key                  ,  id_user_mod_key)   
        ,   dtt_mod                           =    ISNULL(@dtt_mod                          ,  dtt_mod)   
        ,   dtt_create                        =    ISNULL(@dtt_create                       ,  dtt_create)    
        ,   id_event_key                      =    ISNULL(@id_event_key                     ,  id_event_key)
        ,   id_creator_key                    =    ISNULL(@id_creator_key                   ,  id_creator_key) 
        ,   id_acquisition_applicant_key      =  ISNULL(@id_acquisition_applicant_key     ,  id_acquisition_applicant_key )
        ,   tx_organization_name              =  ISNULL(@tx_organization_name             ,  tx_organization_name )
        ,   tx_designation                    =  ISNULL(@tx_designation                   ,  tx_designation )
        ,   dec_service_length                =  ISNULL(@dec_service_length               ,  dec_service_length )
        ,   tx_loan_type                      =  ISNULL(@tx_loan_type                     ,  tx_loan_type )
        ,   tx_financial_institution_name     =  ISNULL(@tx_financial_institution_name    ,  tx_financial_institution_name )
        ,   tx_loanacno_or_card_no             =  ISNULL(@tx_loanacno_or_card_no            ,  tx_loanacno_or_card_no )
        ,   dec_sanction_limit                =  ISNULL(@dec_sanction_limit               ,  dec_sanction_limit )
        ,   tx_validity                       =  ISNULL(@tx_validity                      ,  tx_validity )
        ,   dec_present_out_standing          =  ISNULL(@dec_present_out_standing         ,  dec_present_out_standing )
        ,   dec_emi                           =  ISNULL(@dec_emi                          ,  dec_emi )
        ,   tx_account_title                  =  ISNULL(@tx_account_title                 ,  tx_account_title )
        ,   tx_bank_name                      =  ISNULL(@tx_bank_name                     ,  tx_bank_name )
        ,   tx_branch_name                    =  ISNULL(@tx_branch_name                   ,  tx_branch_name )
        ,   tx_account_no                     =  ISNULL(@tx_account_no                    ,  tx_account_no )
        ,   tx_security_type                  =  ISNULL(@tx_security_type                 ,  tx_security_type )
        ,   tx_beneficiary                    =  ISNULL(@tx_beneficiary                   ,  tx_beneficiary )
        ,   dec_rate                          =  ISNULL(@dec_rate                         ,  dec_rate )
        ,   tx_ac_instrument_no               =  ISNULL(@tx_ac_instrument_no              ,  tx_ac_instrument_no )
        ,   dtt_issue_date                    =  ISNULL(@dtt_issue_date                   ,  dtt_issue_date )
        ,   tx_face_value                     =  ISNULL(@tx_face_value                    ,  tx_face_value )
        ,   tx_present_value                  =  ISNULL(@tx_present_value                 ,  tx_present_value )
        ,   tx_company_name                   =  ISNULL(@tx_company_name                  ,  tx_company_name )
        ,   tx_main_address                   =  ISNULL(@tx_main_address                  ,  tx_main_address )
        ,   tx_additional_address             =  ISNULL(@tx_additional_address            ,  tx_additional_address )
        ,   tx_availing_any_loan_this_company =  ISNULL(@tx_availing_any_loan_this_company,tx_availing_any_loan_this_company)
        ,   tx_name_of_company_bank           =  ISNULL(@tx_name_of_company_bank          ,  tx_name_of_company_bank )
        ,   tx_branch_of_company_bank         =  ISNULL(@tx_branch_of_company_bank        ,  tx_branch_of_company_bank )
        ,   tx_object_type                    =  ISNULL(@tx_object_type                   ,  tx_object_type )
        ,   tx_inputed_by                     =  ISNULL(@tx_inputed_by                    ,  tx_inputed_by )
        ,   tx_group                          =  ISNULL(@tx_group                         ,  tx_group )
        ,   tx_sub_group                      =  ISNULL(@tx_sub_group                     ,  tx_sub_group )   WHERE   id_acquisition_details_config_key                        =    @id_acquisition_details_config_key
            AND     is_active = 1
    END
    IF ( @tx_action_name = 'DELETE')
    BEGIN
        UPDATE T_ACQUISITION_DETAILS_CONFIG
        SET id_acquisition_details_config_ver  = id_acquisition_details_config_ver + 1
        , is_active = 0
        WHERE id_acquisition_details_config_key = @id_acquisition_details_config_key
    END
    IF(@tx_action_name = 'SELECT')
    BEGIN
      SELECT tx_rs_type ='RS_TYPE_ACQUISITION_DETAILS_CONFIG'
      , AC.*
      FROM T_ACQUISITION_DETAILS_CONFIG AC
      WHERE AC.tx_object_type                = ISNULL(@tx_object_type                      ,AC.tx_object_type)
      AND AC.tx_sub_group                    = ISNULL(@tx_sub_group                        ,AC.tx_sub_group)
      AND AC.tx_group                        = ISNULL(@tx_group                            ,AC.tx_group)
      AND AC.id_acquisition_applicant_key    = ISNULL(@id_acquisition_applicant_key        ,AC.id_acquisition_applicant_key)
      AND   AC.is_active       = 1
    END
    IF ( (@g_is_record_time = 1) )
        SELECT @g_dtt_proc_end = GETDATE()
    IF ( (@g_is_record_time = 1) )
        SELECT @g_dtt_tot_elapsed  = datediff(ss, @g_dtt_proc_start, @g_dtt_proc_end)

    SELECT @g_tx_err_msg = 'Exiting[ACT_acquisition_details_config] : @tx_action[' + ISNULL(@tx_action_name, '?') + ']'
    SELECT @g_dtt_log = GETDATE(), @g_tx_sp_name = 'ACT_acquisition_details_config.sp', @g_id_line_num = 506

    -- TODO_H : [Naz] Move to Function

    IF ( NOT (((@g_id_log_level IS NULL) OR (@g_id_log_level = -2147483648))) )
    BEGIN
        IF (2 >= @g_id_log_level)
        BEGIN
            IF (@g_is_print_msg = 1)
            BEGIN
                SELECT @g_tx_tmp_log_msg = '[' + @g_tx_sp_name + ':' + convert(varchar, @g_id_line_num) + '] | ' + convert(varchar, @g_dtt_log) + ' | ' + 'INFO ' + ' | ' + '?' + ' | [' + convert(varchar, 0) + '] -> ' + ISNULL(@g_tx_err_msg, '?')
                PRINT  @g_tx_tmp_log_msg
            END

            IF ( (@g_is_persist_msg = 1) )
            BEGIN
                EXEC @g_id_return_status = ACT_msg_log   @tx_action_name = 'NEW', @id_env_key = @g_id_env_key, @id_user_mod_key = @id_user_mod_key, @dtt_mod = @g_dtt_log
                                                       , @id_state_key = @id_state_key, @id_action_key = @id_action_key, @tx_log_msg_type='?', @tx_log_level='INFO ', @id_log_level=2
                                                       , @tx_sp_name=@g_tx_sp_name, @id_line_num=@g_id_line_num, @id_err_code=0, @tx_log_msg=@g_tx_err_msg, @tx_json_log_msg = @tx_json_log_msg OUTPUT
            
                IF (@g_id_return_status != 0)
                BEGIN
                    RAISERROR ('Error calling ACT_msg_log', 16, 1)
                    IF (@g_is_sp_txn = 1)
                    BEGIN
                        SELECT @g_is_sp_txn = 0
                        ROLLBACK TRANSACTION
                
                        IF ( (@@NESTLEVEL = 1) )
                        BEGIN
                            EXEC @g_id_return_status = ACT_msg_log @tx_action_name = 'LOG_JSON', @tx_json_log_msg = @tx_json_log_msg, @ct_nestlevel = @@NESTLEVEL
                    
                            IF (@g_id_return_status != 0)
                            BEGIN
                                PRINT 'ERROR SAVING JSON LOG MSG!'
                            END
                        END
                    END
                    IF ( (@@NESTLEVEL = 1) AND (@g_is_ext_txn = 1) )
                    BEGIN
                        -- SELECT @tx_json_log_msg = 'JSON_LOG:[' + @tx_json_log_msg + ']'
                
                        IF (30008 = 0)
                        BEGIN
                            --RAISERROR (@tx_json_log_msg, 10, 1)
                            EXEC SYS_split_raise_error @tx_data_orig = @tx_json_log_msg, @tx_separator = 'DB_NEW_LINE', @id_severity_key = 10
                
                        END
                        ELSE
                        BEGIN
                            --RAISERROR (@tx_json_log_msg, 16, 1)
                            EXEC SYS_split_raise_error @tx_data_orig = @tx_json_log_msg, @tx_separator = 'DB_NEW_LINE', @id_severity_key = 16
                        END
                    END
                
                    RETURN 30008
                END
            END
        END
    END

    IF ( (@@NESTLEVEL = 1) AND (@g_is_ext_txn = 1) )
    BEGIN
        -- SELECT @tx_json_log_msg = 'JSON_LOG:[' + @tx_json_log_msg + ']'

        IF (0 = 0)
        BEGIN
            --RAISERROR (@tx_json_log_msg, 10, 1)
            EXEC SYS_split_raise_error @tx_data_orig = @tx_json_log_msg, @tx_separator = 'DB_NEW_LINE', @id_severity_key = 10

        END
        ELSE
        BEGIN
            --RAISERROR (@tx_json_log_msg, 16, 1)
            EXEC SYS_split_raise_error @tx_data_orig = @tx_json_log_msg, @tx_separator = 'DB_NEW_LINE', @id_severity_key = 16
        END
    END

    RETURN 0
END
go

GRANT EXECUTE ON ACT_acquisition_details_config TO app_ro, app_rw
    go