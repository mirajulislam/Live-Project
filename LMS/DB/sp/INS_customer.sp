/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Kh. Assaduzzaman Sohan
* Date          : 24 DEC 2019
* Description   : Sp to INSERT information in T_CUSTOMER Table
*****************************************************************************************/
#include <nSMART_SQL.h>

#define _SP_NAME        {INS_customer};
#define _TABLE_NAME     {T_CUSTOMER};
#define _PRIMARY_KEY    {id_customer_key};
#define _VERSION        {id_customer_ver};

_DROP_PROC

_CREATE_PROC (_SP_NAME)

    _SP_PARAM_HEADER

    , @_PRIMARY_KEY                      INT                    = NULL      OUTPUT   
    , @_VERSION                          INT                    = NULL      OUTPUT   

    , @tx_customer_id                    VARCHAR(256)           = NULL      

    , @tx_bp_no                          VARCHAR(256)           = NULL      
    , @tx_customer_name                  VARCHAR(256)           = NULL
    , @tx_designation                    VARCHAR(256)           = NULL
    , @tx_current_posting_place          VARCHAR(256)           = NULL
    , @dtt_date_of_birth                 DATETIME               = NULL
    , @tx_age                            VARCHAR(256)           = NULL
    , @dtt_joining_date                  DATETIME               = NULL
    , @tx_service_length                 VARCHAR(256)           = NULL
    , @dtt_retirement_date               DATETIME               = NULL
    , @tx_remaining_year_of_retirement   VARCHAR(256)           = NULL
   
    , @tx_nid                            VARCHAR(256)           = NULL
    , @tx_tin                            VARCHAR(256)           = NULL
    , @tx_account_no                     VARCHAR(256)           = NULL
    , @int_salary_disbursed_with_cbbl    INT                    = NULL
    , @tx_marital_status                 VARCHAR(256)           = NULL
    , @tx_cif                            VARCHAR(256)           = NULL
    , @tx_mother_name                    VARCHAR(256)           = NULL
    , @tx_father_name                    VARCHAR(256)           = NULL
    , @tx_spouse                         VARCHAR(256)           = NULL
    , @tx_house_ownership                VARCHAR(256)           = NULL
    , @tx_permanet_addr                  VARCHAR(256)           = NULL
    , @tx_office_addr                    VARCHAR(256)           = NULL
    , @tx_mobile                         VARCHAR(256)           = NULL
    , @tx_emer_phone                     VARCHAR(256)           = NULL
    , @tx_is_matched_nid                 VARCHAR(256)           = NULL
    , @id_customer_type_key              INT                    = NULL
    , @tx_name_in_bangla                NVARCHAR(256)           = NULL
    , @tx_alternative_mobile            VARCHAR(16)             = NULL
    , @tx_office_id                     VARCHAR(256)           = NULL
    , @tx_district                      VARCHAR(48)            = NULL 
    , @tx_division                      VARCHAR(48)            = NULL
    , @tx_unit_1                        VARCHAR(48)            = NULL
    , @tx_unit_2                        VARCHAR(48)            = NULL

    _SP_PARAM_FOOTER

AS

{
	_SP_HEADER

	_INIT_VERSION(@_VERSION)

	INSERT INTO _TABLE_NAME
    (
    id_customer_ver
    ,_TABLE_HEADER_INS_FIELD_WITH_STATE
          
    , tx_customer_id  
    , id_customer_type_key                                    
    , tx_bp_no                        
    , tx_customer_name                
    , tx_designation                  
    , tx_current_posting_place        
    , dtt_date_of_birth               
    , tx_age                         
    , dtt_joining_date                
    , tx_service_length              
    , dtt_retirement_date             
    , tx_remaining_year_of_retirement
    , tx_nid                          
    , tx_tin                          
    , tx_account_no                   
    , int_salary_disbursed_with_cbbl  
    , tx_marital_status               
    , tx_cif                          
    , tx_mother_name                  
    , tx_father_name                  
    , tx_spouse                       
    , tx_house_ownership              
    , tx_permanet_addr                
    , tx_office_addr 
    , tx_mobile                 
    , tx_emer_phone    
    , tx_is_matched_nid 
    , tx_name_in_bangla
    , tx_alternative_mobile
    , tx_office_id
    , tx_district
    , tx_division
    , tx_unit_1
    , tx_unit_2

    )
    VALUES
    (  
    @_VERSION
    ,_TABLE_HEADER_INS_VAL_WITH_STATE

    , ISNULL(@tx_customer_id                  , _DB_NULL_STR)
    , ISNULL(@id_customer_type_key            , _DB_NULL_INT)
    , ISNULL(@tx_bp_no                        , _DB_NULL_STR)
    , ISNULL(@tx_customer_name                , _DB_NULL_STR)
    , ISNULL(@tx_designation                  , _DB_NULL_STR)
    , ISNULL(@tx_current_posting_place        , _DB_NULL_STR)
    , @dtt_date_of_birth
    , ISNULL(@tx_age                          , _DB_NULL_STR)
    , @dtt_joining_date 
    , ISNULL(@tx_service_length               , _DB_NULL_STR)
    , @dtt_retirement_date 
    , ISNULL(@tx_remaining_year_of_retirement , _DB_NULL_STR)
    , ISNULL(@tx_nid                          , _DB_NULL_STR)
    , ISNULL(@tx_tin                          , _DB_NULL_STR)
    , ISNULL(@tx_account_no                   , _DB_NULL_STR)
    , ISNULL(@int_salary_disbursed_with_cbbl  , _DB_NULL_INT)
    , ISNULL(@tx_marital_status               , _DB_NULL_STR)
    , ISNULL(@tx_cif                          , _DB_NULL_STR)
    , ISNULL(@tx_mother_name                  , _DB_NULL_STR)
    , ISNULL(@tx_father_name                  , _DB_NULL_STR)
    , ISNULL(@tx_spouse                       , _DB_NULL_STR)
    , ISNULL(@tx_house_ownership              , _DB_NULL_STR)
    , ISNULL(@tx_permanet_addr                , _DB_NULL_STR)
    , ISNULL(@tx_office_addr                  , _DB_NULL_STR)
    , ISNULL(@tx_mobile                       , _DB_NULL_STR)
    , ISNULL(@tx_emer_phone                   , _DB_NULL_STR)
    , ISNULL(@tx_is_matched_nid               , _DB_NULL_STR)
    , ISNULL(@tx_name_in_bangla               , _DB_NULL_STR)
    , ISNULL(@tx_alternative_mobile           , _DB_NULL_STR)
    , ISNULL(@tx_office_id                    , _DB_NULL_STR)
    , ISNULL(@tx_district                     , _DB_NULL_STR)
    , ISNULL(@tx_division                     , _DB_NULL_STR)
    , ISNULL(@tx_unit_1                     , _DB_NULL_STR)
    , ISNULL(@tx_unit_2                     , _DB_NULL_STR)      
    
    )

    SELECT @_PRIMARY_KEY = IDENT_CURRENT('T_CUSTOMER')

	_STORE_SYS_VARS
	SELECT @g_tx_err_msg = _GEM_INSERT(_TABLE_NAME, @_PRIMARY_KEY)
	
	_HANDLE_ZERO_ROW_COUNT(_GEC_INSERT, @g_tx_err_msg)

	_TOUCHED_TABLE(_TABLE_NAME)

	_SP_FOOTER

	RETURN _STATUS_OK
}
go

_GRANT_PERM_SP