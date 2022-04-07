/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Mirajul.islam
* Date          : 01 JAN 2022
* Description   : 
*****************************************************************************************/
#include <nSMART_SQL.h>

#define _SP_NAME        {ACT_acquisition_details_config};
#define _TABLE_NAME     {T_ACQUISITION_DETAILS_CONFIG};
#define _PRIMARY_KEY    {id_acquisition_details_config_key};
#define _VERSION        {id_acquisition_details_config_ver};

_DROP_PROC

_CREATE_PROC (_SP_NAME)
    
    _SP_PARAM_HEADER

    ,  @_PRIMARY_KEY                                        INT                         = NULL
    ,  @_VERSION                                            INT                         = NULL

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

    _SP_PARAM_FOOTER

AS

{
    _SP_HEADER

     IF (((@dtt_mod IS NULL) OR (@dtt_mod = _DB_NULL_DATE)))
      {
        SELECT @dtt_mod = GETDATE()
      }

       IF ( @tx_action_name = _ACTION_NEW)
    {
        INSERT INTO _TABLE_NAME
        (     
                    _VERSION

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
                ,  ISNULL(@id_user_mod_key                      ,_DB_NULL_INT) 
                ,  ISNULL(@dtt_mod                              ,GETDATE()) 
                ,  ISNULL(@dtt_create                           ,GETDATE())    
                ,  ISNULL(@id_event_key                         ,_DB_NULL_INT)  
                ,  ISNULL(@id_creator_key                       ,_DB_NULL_INT)
                ,  ISNULL(@id_acquisition_applicant_key         ,_DB_NULL_INT)                         
                ,  ISNULL(@tx_organization_name                 ,_DB_NULL_STR)                 
                ,  ISNULL(@tx_designation                       ,_DB_NULL_STR)             
                ,  ISNULL(@dec_service_length                   ,_DB_NULL_FLOAT)                                            
                ,  ISNULL(@tx_loan_type                         ,_DB_NULL_STR)         
                ,  ISNULL(@tx_financial_institution_name        ,_DB_NULL_STR)                             
                ,  ISNULL(@tx_loanacno_or_card_no                ,_DB_NULL_STR)                     
                ,  ISNULL(@dec_sanction_limit                   ,_DB_NULL_FLOAT)                 
                ,  ISNULL(@tx_validity                          ,_DB_NULL_STR)         
                ,  ISNULL(@dec_present_out_standing             ,_DB_NULL_FLOAT)                     
                ,  ISNULL(@dec_emi                              ,_DB_NULL_FLOAT)                        
                ,  ISNULL(@tx_account_title                     ,_DB_NULL_STR)             
                ,  ISNULL(@tx_bank_name                         ,_DB_NULL_STR)         
                ,  ISNULL(@tx_branch_name                       ,_DB_NULL_STR)             
                ,  ISNULL(@tx_account_no                        ,_DB_NULL_STR)             
                ,  ISNULL(@tx_security_type                     ,_DB_NULL_STR)             
                ,  ISNULL(@tx_beneficiary                       ,_DB_NULL_STR)             
                ,  ISNULL(@dec_rate                             ,_DB_NULL_FLOAT)     
                ,  ISNULL(@tx_ac_instrument_no                  ,_DB_NULL_STR)                 
                ,  ISNULL(@dtt_issue_date                       ,_DB_NULL_DATE)             
                ,  ISNULL(@tx_face_value                        ,_DB_NULL_STR)             
                ,  ISNULL(@tx_present_value                     ,_DB_NULL_STR)             
                ,  ISNULL(@tx_company_name                      ,_DB_NULL_STR)             
                ,  ISNULL(@tx_main_address                      ,_DB_NULL_STR)             
                ,  ISNULL(@tx_additional_address                ,_DB_NULL_STR)                     
                ,  ISNULL(@tx_availing_any_loan_this_company    ,_DB_NULL_STR)                                 
                ,  ISNULL(@tx_name_of_company_bank              ,_DB_NULL_STR)                     
                ,  ISNULL(@tx_branch_of_company_bank            ,_DB_NULL_STR)                         
                ,  ISNULL(@tx_object_type                       ,_DB_NULL_STR)                 
                ,  ISNULL(@tx_inputed_by                        ,_DB_NULL_STR)             
                ,  ISNULL(@tx_group                             ,_DB_NULL_STR)     
                ,  ISNULL(@tx_sub_group                         ,_DB_NULL_STR)         
        )   
        SELECT @_PRIMARY_KEY = IDENT_CURRENT('T_ACQUISITION_DETAILS_CONFIG')         
    }
    IF( @tx_action_name = _ACTION_UPDATE )
    {
        if(@id_acquisition_details_config_ver IS NULL)
        {
             SELECT @id_acquisition_details_config_ver = (SELECT id_acquisition_details_config_ver FROM T_ACQUISITION_DETAILS_CONFIG WHERE id_acquisition_details_config_key = @id_acquisition_details_config_key)
     
        }

        UPDATE _TABLE_NAME
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
        ,   tx_sub_group                      =  ISNULL(@tx_sub_group                     ,  tx_sub_group )   WHERE   id_acquisition_details_config_key                        =    @_PRIMARY_KEY
            AND     is_active = 1
    }
    IF ( @tx_action_name = 'DELETE')
    {
        UPDATE _TABLE_NAME
        SET id_acquisition_details_config_ver  = id_acquisition_details_config_ver + 1
        , is_active = 0
        WHERE id_acquisition_details_config_key = @_PRIMARY_KEY
    }
    IF(@tx_action_name = 'SELECT')
    {
      SELECT tx_rs_type ='RS_TYPE_ACQUISITION_DETAILS_CONFIG'
      , AC.*
      FROM T_ACQUISITION_DETAILS_CONFIG AC
      WHERE AC.tx_object_type                = ISNULL(@tx_object_type                      ,AC.tx_object_type)
      AND AC.tx_sub_group                    = ISNULL(@tx_sub_group                        ,AC.tx_sub_group)
      AND AC.tx_group                        = ISNULL(@tx_group                            ,AC.tx_group)
      AND AC.id_acquisition_applicant_key    = ISNULL(@id_acquisition_applicant_key        ,AC.id_acquisition_applicant_key)
      AND   AC.is_active       = 1
    }
    _SP_FOOTER
}
go

_GRANT_PERM_SP