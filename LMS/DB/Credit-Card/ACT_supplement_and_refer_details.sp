/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Mirajul.islam
* Date          : 01 JAN 2022
* Description   : 
*****************************************************************************************/
#include <nSMART_SQL.h>

#define _SP_NAME        {ACT_supplement_and_refer_details};
#define _TABLE_NAME     {T_SUPPLEMENT_AND_REFER_DETAILS};
#define _PRIMARY_KEY    {id_supplement_and_refer_key};
#define _VERSION        {id_supplement_and_refer_ver};

_DROP_PROC

_CREATE_PROC (_SP_NAME)
    
    _SP_PARAM_HEADER
    ,  @_PRIMARY_KEY                                        INT                         = NULL       OUTPUT
    ,  @_VERSION                                            INT                         = NULL 

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
        ,   ISNULL(@id_user_mod_key                                        ,    _DB_NULL_INT)   
        ,   ISNULL(@dtt_mod                                                ,    GETDATE())   
        ,   ISNULL(@dtt_create                                             ,    GETDATE())      
        ,   ISNULL(@id_event_key                                           ,    0)  
        ,   ISNULL(@id_creator_key                                         ,    _DB_NULL_INT)
        ,   ISNULL(@tx_supp_applicant_name                                 ,_DB_NULL_STR )           
        ,   ISNULL(@tx_relation_principal_applicant                        ,_DB_NULL_STR )  
        ,   ISNULL(@tx_relation_principal_applicant_others                  ,_DB_NULL_STR )
        ,   ISNULL(@tx_supp_applicant_gender                               ,_DB_NULL_STR )         
        ,   ISNULL(@dtt_supp_applicant_dateof_birth                        ,    _DB_NULL_DATE )  
        ,   ISNULL(@tx_supp_applicant_occupation                           ,_DB_NULL_STR )     
        ,   ISNULL(@tx_supp_applicant_father_name                          ,_DB_NULL_STR )    
        ,   ISNULL(@tx_supp_applicant_mother_name                          ,_DB_NULL_STR )    
        ,   ISNULL(@tx_supp_applicant_spouse_name                          ,_DB_NULL_STR )    
        ,   ISNULL(@tx_supp_applicant_present_address                      ,_DB_NULL_STR )
        ,   ISNULL(@tx_supp_applicant_per_address                          ,_DB_NULL_STR )    
        ,   ISNULL(@tx_supp_applicant_mobile                               ,_DB_NULL_STR )         
        ,   ISNULL(@tx_supp_applicant_email                                ,_DB_NULL_STR )          
        ,   ISNULL(@tx_supp_applicant_nid                                  ,_DB_NULL_STR )            
        ,   ISNULL(@tx_supp_applicant_passport                             ,_DB_NULL_STR )       
        ,   ISNULL(@dtt_supp_applicant_dateof_exp                          ,    _DB_NULL_DATE )    
        ,   ISNULL(@tx_supp_you_are_setup_limit_card                       ,_DB_NULL_STR ) 
        ,   ISNULL(@dec_supp_set_up_limit_bd_amount                         ,_DB_NULL_FLOAT)   
        ,   ISNULL(@dec_supp_set_up_limit_percent                          ,_DB_NULL_FLOAT)    
        ,   ISNULL(@dec_supp_set_up_limit_usd_amount                        ,_DB_NULL_FLOAT)  
        ,   ISNULL(@tx_ref_name                                            ,_DB_NULL_STR )                      
        ,   ISNULL(@tx_ref_relation_with_applicant                         ,_DB_NULL_STR )   
        ,   ISNULL(@tx_ref_profession                                      ,_DB_NULL_STR )                
        ,   ISNULL(@tx_ref_org_name                                         ,_DB_NULL_STR )                   
        ,   ISNULL(@tx_ref_designation                                     ,_DB_NULL_STR )               
        ,   ISNULL(@tx_ref_workor_residence_address                        ,_DB_NULL_STR )  
        ,   ISNULL(@tx_ref_telephone                                       ,_DB_NULL_STR )                 
        ,   ISNULL(@tx_ref_mobile                                         ,_DB_NULL_STR )                   
        ,   ISNULL(@tx_ref_email                                           ,_DB_NULL_STR )                                                    
        )
        SELECT @_PRIMARY_KEY = IDENT_CURRENT('T_SUPPLEMENT_AND_REFER_DETAILS') 
    }

    IF( @tx_action_name = _ACTION_UPDATE )
    {
        if(@id_supplement_and_refer_ver IS NULL)
        {
            SELECT @id_supplement_and_refer_ver = (SELECT id_supplement_and_refer_ver FROM T_SUPPLEMENT_AND_REFER_DETAILS WHERE id_supplement_and_refer_key = @id_supplement_and_refer_key)
        }
        UPDATE _TABLE_NAME
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
        WHERE   id_supplement_and_refer_key       = @_PRIMARY_KEY
        AND     is_active = 1                               
    }

    IF ( @tx_action_name = 'DELETE')
    {
        UPDATE _TABLE_NAME
        SET id_supplement_and_refer_ver  = id_supplement_and_refer_ver + 1
        , is_active = 0
        WHERE id_supplement_and_refer_key = @_PRIMARY_KEY
    }

    _SP_FOOTER
}
go

_GRANT_PERM_SP