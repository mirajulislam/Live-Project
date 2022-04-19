/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Mirajul.islam
* Date          : 01 JAN 2022
* Description   : 
*****************************************************************************************/
    

EXEC DROP_db_object @tx_db_object_type = 'P', @tx_db_object_name = 'ACT_supplement_and_refer_details'
    go

IF ('CREATE' = 'CREATE')
        PRINT '**** WARNING : CREATING SP ****'
    ELSE IF ('CREATE' = 'ALTER')
        PRINT '**** WARNING : ALTER SP ****'
    ELSE
        PRINT '**** WARNING : UNKNOWN TABLE PROC ****'
    go

    CREATE PROC ACT_supplement_and_refer_details
    
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
    ,  @id_supplement_and_refer_key                                        INT                         = NULL       OUTPUT
    ,  @id_supplement_and_refer_ver                                            INT                         = NULL 

    ,  @dtt_create                                          DATETIME                    = NULL  
    ,  @id_creator_key                                      INT                         = NULL
    ,  @tx_supp_applicant_name                              VARCHAR(256)                = NULL
    ,  @tx_relation_principal_applicant                     VARCHAR(256)                = NULL
    ,  @tx_relation_principal_applicant_others               VARCHAR(256)                = NULL
    ,  @tx_supp_applicant_gender                            VARCHAR(256)                = NULL
    ,  @dtt_supp_applicant_dateof_birth                     DATETIME                    = NULL
    ,  @tx_supp_applicant_occupation                        VARCHAR(256)                = NULL
    ,  @tx_supp_applicant_father_name                       VARCHAR(256)                = NULL
    ,  @tx_supp_applicant_mother_name                       VARCHAR(256)                = NULL
    ,  @tx_supp_applicant_spouse_name                       VARCHAR(256)                = NULL
    ,  @tx_supp_applicant_present_address                   VARCHAR(256)                = NULL
    ,  @tx_supp_applicant_per_address                       VARCHAR(256)                = NULL
    ,  @tx_supp_applicant_mobile                            VARCHAR(256)                = NULL
    ,  @tx_supp_applicant_email                             VARCHAR(256)                = NULL
    ,  @tx_supp_applicant_nid                               VARCHAR(256)                = NULL
    ,  @tx_supp_applicant_passport                          VARCHAR(256)                = NULL
    ,  @dtt_supp_applicant_dateof_exp                       DATETIME                    = NULL
    ,  @tx_supp_you_are_setup_limit_card                    VARCHAR(256)                = NULL
    ,  @dec_supp_set_up_limit_bd_amount                      DECIMAL(20, 2)              = NULL
    ,  @dec_supp_set_up_limit_percent                       DECIMAL(20, 2)              = NULL
    ,  @dec_supp_set_up_limit_usd_amount                     DECIMAL(20, 2)              = NULL
    ,  @tx_ref_name                                         VARCHAR(256)                = NULL
    ,  @tx_ref_relation_with_applicant                      VARCHAR(256)                = NULL
    ,  @tx_ref_profession                                   VARCHAR(256)                = NULL
    ,  @tx_ref_org_name                                      VARCHAR(256)                = NULL
    ,  @tx_ref_designation                                  VARCHAR(256)                = NULL
    ,  @tx_ref_workor_residence_address                     VARCHAR(256)                = NULL
    ,  @tx_ref_telephone                                    VARCHAR(256)                = NULL
    ,  @tx_ref_mobile                                      VARCHAR(256)                = NULL
    ,  @tx_ref_email                                        VARCHAR(256)                = NULL

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
        EXEC @g_id_return_status = GET_sp_log_level @tx_sp_name='ACT_supplement_and_refer_details', @tx_log_level=@tx_log_level OUTPUT, @id_log_level=@id_log_level OUTPUT, @is_record_time=@is_record_time OUTPUT, @is_print_msg=@is_print_msg OUTPUT, @is_persist_msg=@is_persist_msg OUTPUT
    END

    SELECT @g_is_record_time = @is_record_time, @g_is_print_msg = @is_print_msg, @g_is_persist_msg  = @is_persist_msg, @g_id_log_level = @id_log_level

    SELECT @g_tx_err_msg = 'Entering[ACT_supplement_and_refer_details] : @tx_action[' + ISNULL(@tx_action_name, '?') + ']'
    SELECT @g_dtt_log = GETDATE(), @g_tx_sp_name = 'ACT_supplement_and_refer_details.sp', @g_id_line_num = 170

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
        INSERT INTO T_SUPPLEMENT_AND_REFER_DETAILS
        (     
            id_supplement_and_refer_ver 

        ,   is_active
        ,   id_env_key
        ,   id_user_mod_key
        ,   dtt_mod
        ,   dtt_create
        ,   id_event_key
        ,   id_creator_key    
        ,   tx_supp_applicant_name              
        ,   tx_relation_principal_applicant     
        ,   tx_relation_principal_applicant_others
        ,   tx_supp_applicant_gender            
        ,   dtt_supp_applicant_dateof_birth     
        ,   tx_supp_applicant_occupation        
        ,   tx_supp_applicant_father_name       
        ,   tx_supp_applicant_mother_name       
        ,   tx_supp_applicant_spouse_name       
        ,   tx_supp_applicant_present_address   
        ,   tx_supp_applicant_per_address       
        ,   tx_supp_applicant_mobile            
        ,   tx_supp_applicant_email             
        ,   tx_supp_applicant_nid               
        ,   tx_supp_applicant_passport          
        ,   dtt_supp_applicant_dateof_exp       
        ,   tx_supp_you_are_setup_limit_card    
        ,   dec_supp_set_up_limit_bd_amount      
        ,   dec_supp_set_up_limit_percent       
        ,   dec_supp_set_up_limit_usd_amount     
        ,   tx_ref_name                         
        ,   tx_ref_relation_with_applicant      
        ,   tx_ref_profession                   
        ,   tx_ref_org_name                      
        ,   tx_ref_designation                  
        ,   tx_ref_workor_residence_address     
        ,   tx_ref_telephone                    
        ,   tx_ref_mobile                      
        ,   tx_ref_email                                                  
        )
         VALUES
        (
            0
 
        ,  1
        ,  100000  
        ,   ISNULL(@id_user_mod_key                                        ,    -2147483648)   
        ,   ISNULL(@dtt_mod                                                ,    GETDATE())   
        ,   ISNULL(@dtt_create                                             ,    GETDATE())      
        ,   ISNULL(@id_event_key                                           ,    0)  
        ,   ISNULL(@id_creator_key                                         ,    -2147483648)
        ,   ISNULL(@tx_supp_applicant_name                                 ,'?' )           
        ,   ISNULL(@tx_relation_principal_applicant                        ,'?' )  
        ,   ISNULL(@tx_relation_principal_applicant_others                  ,'?' )
        ,   ISNULL(@tx_supp_applicant_gender                               ,'?' )         
        ,   ISNULL(@dtt_supp_applicant_dateof_birth                        ,    '01/01/1970' )  
        ,   ISNULL(@tx_supp_applicant_occupation                           ,'?' )     
        ,   ISNULL(@tx_supp_applicant_father_name                          ,'?' )    
        ,   ISNULL(@tx_supp_applicant_mother_name                          ,'?' )    
        ,   ISNULL(@tx_supp_applicant_spouse_name                          ,'?' )    
        ,   ISNULL(@tx_supp_applicant_present_address                      ,'?' )
        ,   ISNULL(@tx_supp_applicant_per_address                          ,'?' )    
        ,   ISNULL(@tx_supp_applicant_mobile                               ,'?' )         
        ,   ISNULL(@tx_supp_applicant_email                                ,'?' )          
        ,   ISNULL(@tx_supp_applicant_nid                                  ,'?' )            
        ,   ISNULL(@tx_supp_applicant_passport                             ,'?' )       
        ,   ISNULL(@dtt_supp_applicant_dateof_exp                          ,    '01/01/1970' )    
        ,   ISNULL(@tx_supp_you_are_setup_limit_card                       ,'?' ) 
        ,   ISNULL(@dec_supp_set_up_limit_bd_amount                         ,-2147483648)   
        ,   ISNULL(@dec_supp_set_up_limit_percent                          ,-2147483648)    
        ,   ISNULL(@dec_supp_set_up_limit_usd_amount                        ,-2147483648)  
        ,   ISNULL(@tx_ref_name                                            ,'?' )                      
        ,   ISNULL(@tx_ref_relation_with_applicant                         ,'?' )   
        ,   ISNULL(@tx_ref_profession                                      ,'?' )                
        ,   ISNULL(@tx_ref_org_name                                         ,'?' )                   
        ,   ISNULL(@tx_ref_designation                                     ,'?' )               
        ,   ISNULL(@tx_ref_workor_residence_address                        ,'?' )  
        ,   ISNULL(@tx_ref_telephone                                       ,'?' )                 
        ,   ISNULL(@tx_ref_mobile                                         ,'?' )                   
        ,   ISNULL(@tx_ref_email                                           ,'?' )                                                    
        )
        SELECT @id_supplement_and_refer_key = IDENT_CURRENT('T_SUPPLEMENT_AND_REFER_DETAILS') 
    END

    IF( @tx_action_name = 'UPDATE' )
    BEGIN
        if(@id_supplement_and_refer_ver IS NULL)
        BEGIN
            SELECT @id_supplement_and_refer_ver = (SELECT id_supplement_and_refer_ver FROM T_SUPPLEMENT_AND_REFER_DETAILS WHERE id_supplement_and_refer_key = @id_supplement_and_refer_key)
        END
        UPDATE T_SUPPLEMENT_AND_REFER_DETAILS
        SET 
       id_supplement_and_refer_ver           = @id_supplement_and_refer_ver+1

    ,   is_active                             = ISNULL(@is_active                             , is_active) 
    ,   id_env_key                            = ISNULL(@id_env_key                            , id_env_key)    
    ,   id_user_mod_key                       = ISNULL(@id_user_mod_key                       , id_user_mod_key)   
    ,   dtt_mod                               = ISNULL(@dtt_mod                               , dtt_mod)   
    ,   dtt_create                            = ISNULL(@dtt_create                            , dtt_create)    
    ,   id_event_key                          = ISNULL(@id_event_key                          , id_event_key)
    ,   id_creator_key                        = ISNULL(@id_creator_key                        , id_creator_key) 
    ,   tx_supp_applicant_name                = ISNULL(@tx_supp_applicant_name                , tx_supp_applicant_name)                
    ,   tx_relation_principal_applicant       = ISNULL(@tx_relation_principal_applicant       , tx_relation_principal_applicant)       
    ,   tx_relation_principal_applicant_others = ISNULL(@tx_relation_principal_applicant_others , tx_relation_principal_applicant_others) 
    ,   tx_supp_applicant_gender              = ISNULL(@tx_supp_applicant_gender              , tx_supp_applicant_gender)              
    ,   dtt_supp_applicant_dateof_birth       = ISNULL(@dtt_supp_applicant_dateof_birth       , dtt_supp_applicant_dateof_birth)       
    ,   tx_supp_applicant_occupation          = ISNULL(@tx_supp_applicant_occupation          , tx_supp_applicant_occupation)          
    ,   tx_supp_applicant_father_name         = ISNULL(@tx_supp_applicant_father_name         , tx_supp_applicant_father_name)         
    ,   tx_supp_applicant_mother_name         = ISNULL(@tx_supp_applicant_mother_name         , tx_supp_applicant_mother_name)         
    ,   tx_supp_applicant_spouse_name         = ISNULL(@tx_supp_applicant_spouse_name         , tx_supp_applicant_spouse_name)         
    ,   tx_supp_applicant_present_address     = ISNULL(@tx_supp_applicant_present_address     , tx_supp_applicant_present_address)     
    ,   tx_supp_applicant_per_address         = ISNULL(@tx_supp_applicant_per_address         , tx_supp_applicant_per_address)         
    ,   tx_supp_applicant_mobile              = ISNULL(@tx_supp_applicant_mobile              , tx_supp_applicant_mobile)              
    ,   tx_supp_applicant_email               = ISNULL(@tx_supp_applicant_email               , tx_supp_applicant_email)               
    ,   tx_supp_applicant_nid                 = ISNULL(@tx_supp_applicant_nid                 , tx_supp_applicant_nid)                 
    ,   tx_supp_applicant_passport            = ISNULL(@tx_supp_applicant_passport            , tx_supp_applicant_passport)            
    ,   dtt_supp_applicant_dateof_exp         = ISNULL(@dtt_supp_applicant_dateof_exp         , dtt_supp_applicant_dateof_exp)         
    ,   tx_supp_you_are_setup_limit_card      = ISNULL(@tx_supp_you_are_setup_limit_card      , tx_supp_you_are_setup_limit_card)      
    ,   dec_supp_set_up_limit_bd_amount        = ISNULL(@dec_supp_set_up_limit_bd_amount        , dec_supp_set_up_limit_bd_amount)        
    ,   dec_supp_set_up_limit_percent         = ISNULL(@dec_supp_set_up_limit_percent         , dec_supp_set_up_limit_percent)         
    ,   dec_supp_set_up_limit_usd_amount       = ISNULL(@dec_supp_set_up_limit_usd_amount       , dec_supp_set_up_limit_usd_amount)       
    ,   tx_ref_name                           = ISNULL(@tx_ref_name                           , tx_ref_name)                           
    ,   tx_ref_relation_with_applicant        = ISNULL(@tx_ref_relation_with_applicant        , tx_ref_relation_with_applicant)        
    ,   tx_ref_profession                     = ISNULL(@tx_ref_profession                     , tx_ref_profession)                     
    ,   tx_ref_org_name                        = ISNULL(@tx_ref_org_name                        , tx_ref_org_name)                        
    ,   tx_ref_designation                    = ISNULL(@tx_ref_designation                    , tx_ref_designation)                    
    ,   tx_ref_workor_residence_address       = ISNULL(@tx_ref_workor_residence_address       , tx_ref_workor_residence_address)       
    ,   tx_ref_telephone                      = ISNULL(@tx_ref_telephone                      , tx_ref_telephone)                      
    ,   tx_ref_mobile                        = ISNULL(@tx_ref_mobile                        , tx_ref_mobile)                        
    ,   tx_ref_email                          = ISNULL(@tx_ref_email                          , tx_ref_email)                          
        WHERE   id_supplement_and_refer_key       = @id_supplement_and_refer_key
        AND     is_active = 1                               
    END

    IF ( @tx_action_name = 'DELETE')
    BEGIN
        UPDATE T_SUPPLEMENT_AND_REFER_DETAILS
        SET id_supplement_and_refer_ver  = id_supplement_and_refer_ver + 1
        , is_active = 0
        WHERE id_supplement_and_refer_key = @id_supplement_and_refer_key
    END

    IF ( (@g_is_record_time = 1) )
        SELECT @g_dtt_proc_end = GETDATE()
    IF ( (@g_is_record_time = 1) )
        SELECT @g_dtt_tot_elapsed  = datediff(ss, @g_dtt_proc_start, @g_dtt_proc_end)

    SELECT @g_tx_err_msg = 'Exiting[ACT_supplement_and_refer_details] : @tx_action[' + ISNULL(@tx_action_name, '?') + ']'
    SELECT @g_dtt_log = GETDATE(), @g_tx_sp_name = 'ACT_supplement_and_refer_details.sp', @g_id_line_num = 481

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

GRANT EXECUTE ON ACT_supplement_and_refer_details TO app_ro, app_rw
    go