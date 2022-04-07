/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Kh. Assaduzzaman Sohan
* Date          : 24 DEC 2019
* Description   : 
*****************************************************************************************/
#include <nSMART_SQL.h>

#define _SP_NAME        {ACT_customer};
#define _TABLE_NAME     {T_CUSTOMER};
#define _PRIMARY_KEY    {id_customer_key};
#define _VERSION        {id_customer_ver};


_DROP_PROC

_CREATE_PROC (_SP_NAME)
    
    _SP_PARAM_HEADER

	, @_PRIMARY_KEY					     INT					= NULL		OUTPUT
	, @_VERSION						     INT					= NULL	     OUTPUT

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
    , @tx_mobile                        VARCHAR(256)           = NULL
    , @tx_emer_phone                    VARCHAR(256)           = NULL
    , @tx_is_matched_nid                VARCHAR(256)           = NULL

    , @tx_customer_type                 VARCHAR(256)           = NULL
    , @id_customer_type_key             INT                    = NULL
    , @tx_name_in_bangla                NVARCHAR(256)          = NULL
    , @tx_alternative_mobile            VARCHAR(16)            = NULL
    , @tx_office_id                     VARCHAR(256)           = NULL
    , @tx_district                      VARCHAR(48)            = NULL 
    , @tx_division                      VARCHAR(48)            = NULL
    , @tx_unit_1                        VARCHAR(48)            = NULL
    , @tx_unit_2                        VARCHAR(48)            = NULL
    , @tx_search_Date_Of_Birth          VARCHAR(48)            = NULL
    , @dt_last_date_of_posting          DATE                    = NULL
    , @tx_district_of_posting           VARCHAR(64)             = NULL
    , @tx_name_as_per_nid               VARCHAR(256)            = NULL
    , @tx_customer_posting_district     VARCHAR(256)            = NULL
    , @tx_customer_posting_division     VARCHAR(256)            = NULL
    , @tx_passport_no                   VARCHAR(256)            = NULL
    , @tx_highest_level_of_education    VARCHAR(256)            = NULL
    , @dt_passpord_expiry_date          DATE                    = NULL
    , @tx_email                         VARCHAR(64)             = NULL
    , @tx_kyc_level                     VARCHAR(64)             = NULL
    , @tx_card_monthly_bill_debited     VARCHAR(256)             = NULL

    _SP_PARAM_FOOTER

AS

{
	_SP_HEADER

    IF ( @tx_action_name IN('NEW', 'UPDATE'))
    {
        IF ( (@dtt_date_of_birth IS NOT NULL) AND (@tx_age IS NULL) )
        {
            select @tx_age = dbo.calculateDateDiff(@dtt_date_of_birth, GETDATE()) 
        }
        IF ( (@dtt_joining_date IS NOT NULL) AND (@tx_service_length IS NULL) )
        {
            select @tx_service_length = dbo.calculateDateDiff(@dtt_joining_date, GETDATE())
        }
        IF ( (@dtt_retirement_date IS NOT NULL) AND (@tx_remaining_year_of_retirement IS NULL) )
        {
            select @tx_remaining_year_of_retirement = dbo.calculateDateDiff(@dtt_retirement_date, GETDATE())
        }
    }
    
    
    IF ( @tx_action_name = 'SELECT_USER' )
    {
        SELECT tx_rs_type = 'RS_TYPE_USER'
                 , U.*  
        FROM T_USER U
        WHERE id_user_mod_key = @id_user_mod_key
    }

  IF ( @tx_action_name = _ACTION_NEW )
  {

    DECLARE @l_id_customer_key INT = 
    (
        SELECT TOP(1) id_customer_key 
        FROM T_CUSTOMER 
        WHERE tx_customer_id = @tx_customer_id
        AND is_active = 1
        ORDER BY dtt_mod DESC
    )

    IF(@l_id_customer_key IS NOT NULL)
    {
        _SET_ACTION(_ACTION_UPDATE)

       SELECT @id_customer_key = @l_id_customer_key
    }
    ELSE
    {
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
            , dt_last_date_of_posting
            , tx_district_of_posting
            , tx_name_as_per_nid
            , tx_customer_posting_district
            , tx_customer_posting_division
            , tx_passport_no
            , tx_highest_level_of_education
            , dt_passpord_expiry_date
            , tx_email
            , tx_kyc_level
            , tx_card_monthly_bill_debited
        )
        VALUES
        (  
            0
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
            , ISNULL(@dt_last_date_of_posting       , _DB_NULL_STR)
            , ISNULL(@tx_district_of_posting        , _DB_NULL_STR)
            , ISNULL(@tx_name_as_per_nid            , _DB_NULL_STR)
            , ISNULL(@tx_customer_posting_district  , _DB_NULL_STR)
            , ISNULL(@tx_customer_posting_division  , _DB_NULL_STR)
            , ISNULL(@tx_passport_no                , _DB_NULL_STR)
            , ISNULL(@tx_highest_level_of_education , _DB_NULL_STR)
            , ISNULL(@dt_passpord_expiry_date       , _DB_NULL_STR)
            , ISNULL(@tx_email                      , _DB_NULL_STR)
            , ISNULL(@tx_kyc_level                  , _DB_NULL_STR) 
            , ISNULL(@tx_card_monthly_bill_debited  , _DB_NULL_STR)
        )

        SELECT @_PRIMARY_KEY = IDENT_CURRENT('T_CUSTOMER')

        _STORE_SYS_VARS
        SELECT @g_tx_err_msg = _GEM_INSERT(_TABLE_NAME, @_PRIMARY_KEY)
        
        _HANDLE_ZERO_ROW_COUNT(_GEC_INSERT, @g_tx_err_msg)

        _TOUCHED_TABLE(_TABLE_NAME)   
    }  
  }
  IF ( @tx_action_name = _ACTION_SELECT )
  {
        SELECT  tx_rs_type = 'RS_TYPE_CUSTOMER'
        , C.*
        FROM  _TABLE_NAME C
        WHERE  id_customer_key   = ISNULL(@id_customer_key  ,id_customer_key)
        AND    tx_customer_id    = ISNULL(@tx_customer_id   ,tx_customer_id)
        AND    tx_nid            = ISNULL(@tx_nid           ,tx_nid)
        AND    tx_bp_no          = ISNULL(@tx_bp_no         ,tx_bp_no)
        AND    tx_account_no     = ISNULL(@tx_account_no         ,tx_account_no)
        AND    is_active = 1
  }

  IF (@tx_action_name = _ACTION_DELETE)
  { 
    _SET_ACTION(_ACTION_UPDATE)
    , @is_active = 0
  }

  IF( @tx_action_name = _ACTION_UPDATE )
  {
    UPDATE _TABLE_NAME
      SET _TABLE_HEADER_UPD_WITH_STATE
      , id_customer_ver                  = id_customer_ver + 1
      , tx_customer_id                   = ISNULL(@tx_customer_id                   ,tx_customer_id)
      , id_customer_type_key             = ISNULL(@id_customer_type_key             ,id_customer_type_key)
      , tx_bp_no                         = ISNULL(@tx_bp_no                         ,tx_bp_no)
      , tx_customer_name                 = ISNULL(@tx_customer_name                 ,tx_customer_name)
      , tx_designation                   = ISNULL(@tx_designation                   ,tx_designation)
      , tx_current_posting_place         = ISNULL(@tx_current_posting_place         ,tx_current_posting_place)
      , dtt_date_of_birth                = ISNULL(@dtt_date_of_birth                ,dtt_date_of_birth)
      , tx_age                           = ISNULL(@tx_age                           ,tx_age)
      , dtt_joining_date                 = ISNULL(@dtt_joining_date                 ,dtt_joining_date)
      , tx_service_length                = ISNULL(@tx_service_length                ,tx_service_length)
      , dtt_retirement_date              = ISNULL(@dtt_retirement_date              ,dtt_retirement_date)
      , tx_remaining_year_of_retirement  = ISNULL(@tx_remaining_year_of_retirement  ,tx_remaining_year_of_retirement)
      , tx_nid                           = ISNULL(@tx_nid                           ,tx_nid)
      , tx_tin                           = ISNULL(@tx_tin                           ,tx_tin)
      , tx_account_no                    = ISNULL(@tx_account_no                    ,tx_account_no)
      , int_salary_disbursed_with_cbbl   = ISNULL(@int_salary_disbursed_with_cbbl   ,int_salary_disbursed_with_cbbl)
      , tx_marital_status                = ISNULL(@tx_marital_status                ,tx_marital_status)
      , tx_cif                           = ISNULL(@tx_cif                           ,tx_cif)
      , tx_mother_name                   = ISNULL(@tx_mother_name                   ,tx_mother_name)
      , tx_father_name                   = ISNULL(@tx_father_name                   ,tx_father_name)
      , tx_spouse                        = ISNULL(@tx_spouse                        ,tx_spouse)
      , tx_house_ownership               = ISNULL(@tx_house_ownership               ,tx_house_ownership)
      , tx_permanet_addr                 = ISNULL(@tx_permanet_addr                 ,tx_permanet_addr)
      , tx_office_addr                   = ISNULL(@tx_office_addr                   ,tx_office_addr)
      , tx_mobile                        = ISNULL(@tx_mobile                        ,tx_mobile)
      , tx_emer_phone                    = ISNULL(@tx_emer_phone                    ,tx_emer_phone)
      , tx_is_matched_nid                = ISNULL(@tx_is_matched_nid                ,tx_is_matched_nid)
      , tx_name_in_bangla                = ISNULL(@tx_name_in_bangla                ,tx_name_in_bangla)
      , tx_alternative_mobile            = ISNULL(@tx_alternative_mobile            ,tx_alternative_mobile)
      , tx_office_id                     = ISNULL(@tx_office_id                ,tx_office_id)
      , tx_district                      = ISNULL(@tx_district                ,tx_district)
      , tx_division                      = ISNULL(@tx_division                ,tx_division)
      , tx_unit_1                        = ISNULL(@tx_unit_1                ,tx_unit_1)
      , tx_unit_2                        = ISNULL(@tx_unit_2                ,tx_unit_2)
      , dt_last_date_of_posting = ISNULL(@dt_last_date_of_posting , dt_last_date_of_posting )
      , tx_district_of_posting  = ISNULL(@tx_district_of_posting, tx_district_of_posting)
      , tx_name_as_per_nid  = ISNULL(@tx_name_as_per_nid, tx_name_as_per_nid)
      , tx_customer_posting_district  = ISNULL(@tx_customer_posting_district, tx_customer_posting_district)
      , tx_customer_posting_division  = ISNULL(@tx_customer_posting_division, tx_customer_posting_division)
      , tx_passport_no  = ISNULL(@tx_passport_no, tx_passport_no)
      , tx_highest_level_of_education = ISNULL(@tx_highest_level_of_education , tx_highest_level_of_education )
      , dt_passpord_expiry_date = ISNULL(@dt_passpord_expiry_date , dt_passpord_expiry_date )
      , tx_email  = ISNULL(@tx_email, tx_email)
      , tx_kyc_level  = ISNULL(@tx_kyc_level, tx_kyc_level)
      , tx_card_monthly_bill_debited  = ISNULL(@tx_card_monthly_bill_debited, tx_card_monthly_bill_debited)
      WHERE  id_customer_key   = @id_customer_key
      AND    is_active = 1

    _TOUCHED_TABLE(_TABLE_NAME)
  }

 IF( @tx_action_name = 'SEARCH_NID_DETAILS_FOR_COMPARE' )
  {
    SELECT  tx_rs_type = 'RS_TYPE_CUSTOMER_NID_DETAILS' , C.* from T_CUSTOMER C where 
    CAST(C.dtt_date_of_birth AS DATE) <= ISNULL(CAST(@tx_search_Date_Of_Birth AS DATE)  ,C.dtt_date_of_birth)
    AND C.tx_nid          = ISNULL(@tx_nid        ,C.tx_nid)
    AND C.is_active=1
  }
	_SP_FOOTER
}
go

_GRANT_PERM_SP