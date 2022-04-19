/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Mirajul-islam
* Date          : 02 JAN 2022
* Description   : Table for Acquisition Applicant Details
*****************************************************************************************/
    

EXEC DROP_db_object @tx_db_object_type = 'U', @tx_db_object_name = 'T_SUPPLEMENT_AND_REFER_DETAILS'
    go

IF ('CREATE' = 'CREATE')
        PRINT '**** WARNING : CEATING TBL ****'
    ELSE IF ('CREATE' = 'ALTER')
        PRINT '**** WARNING : ALTER TBL ****'
    ELSE
        PRINT '**** WARNING : UNKNOWN TABLE ACTION  ****'
    go

    CREATE TABLE T_SUPPLEMENT_AND_REFER_DETAILS

(
    id_supplement_and_refer_key                                     INT IDENTITY(100000,1)      NOT NULL
,   id_supplement_and_refer_ver                                         INT                         NOT NULL                            
                                                                                            
,   is_active                                           INT                         NOT NULL
,   id_env_key                                          INT                         NOT NULL
,   id_user_mod_key                                     INT                         NOT NULL
,   dtt_mod                                             DATETIME                    NOT NULL
,   dtt_create                                          DATETIME                    NOT NULL    
,   id_event_key                                        INT                         NOT NULL
,   id_creator_key                                      INT                         NOT NULL
,   tx_supp_applicant_name                              VARCHAR(256)                NOT NULL                                                
,   tx_relation_principal_applicant                     VARCHAR(256)                NOT NULL                                                                    
,   tx_relation_principal_applicant_others              VARCHAR(256)                NOT NULL                                                                                
,   tx_supp_applicant_gender                            VARCHAR(256)                NOT NULL                                            
,   dtt_supp_applicant_dateof_birth                     DATETIME                    NOT NULL
,   tx_supp_applicant_occupation                        VARCHAR(256)                NOT NULL                                                        
,   tx_supp_applicant_father_name                       VARCHAR(256)                NOT NULL                                                    
,   tx_supp_applicant_mother_name                       VARCHAR(256)                NOT NULL                                                
,   tx_supp_applicant_spouse_name                       VARCHAR(256)                NOT NULL                                                            
,   tx_supp_applicant_present_address                   VARCHAR(256)                NOT NULL                                                            
,   tx_supp_applicant_per_address                       VARCHAR(256)                NOT NULL                                                        
,   tx_supp_applicant_mobile                            VARCHAR(256)                NOT NULL                                                
,   tx_supp_applicant_email                             VARCHAR(256)                NOT NULL                                                            
,   tx_supp_applicant_nid                               VARCHAR(256)                NOT NULL                                                
,   tx_supp_applicant_passport                          VARCHAR(256)                NOT NULL                                                            
,   dtt_supp_applicant_dateof_exp                       DATETIME                    NOT NULL
,   tx_supp_you_are_setup_limit_card                    VARCHAR(256)                NOT NULL                                
,   dec_supp_set_up_limit_bd_amount                     DECIMAL(20, 2)              NOT NULL
,   dec_supp_set_up_limit_percent                       DECIMAL(20, 2)              NOT NULL
,   dec_supp_set_up_limit_usd_amount                    DECIMAL(20, 2)              NOT NULL
,   tx_ref_name                                         VARCHAR(256)                NOT NULL                                
,   tx_ref_relation_with_applicant                      VARCHAR(256)                NOT NULL                                
,   tx_ref_profession                                   VARCHAR(256)                NOT NULL                                
,   tx_ref_org_name                                     VARCHAR(256)                NOT NULL                                
,   tx_ref_designation                                  VARCHAR(256)                NOT NULL                                
,   tx_ref_workor_residence_address                     VARCHAR(256)                NOT NULL                                
,   tx_ref_telephone                                    VARCHAR(256)                NOT NULL                                
,   tx_ref_mobile                                       VARCHAR(256)                NOT NULL                                
,   tx_ref_email                                        VARCHAR(256)                NOT NULL                            
,   CONSTRAINT pk_id_supplement_and_refer_key PRIMARY KEY  CLUSTERED(id_supplement_and_refer_key)
)
go

GRANT SELECT    ON T_SUPPLEMENT_AND_REFER_DETAILS TO app_so, app_ro
    GRANT ALL       ON T_SUPPLEMENT_AND_REFER_DETAILS TO app_rw
    go