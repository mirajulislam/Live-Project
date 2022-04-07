/* __VER_INFO__  :  */
/****************************************************************************************
* Author        : Kh. Assaduzzaman Sohan
* Date          : 05 Aug 2021
* Description   : 
*****************************************************************************************/
#include <nSMART_SQL.h>

#define _SP_NAME        {ACT_document};
#define _TABLE_NAME     {T_DOCUMENT};
#define _PRIMARY_KEY    {id_document_key};
#define _VERSION        {id_document_ver};


_DROP_PROC

_CREATE_PROC (_SP_NAME)
    
  _SP_PARAM_HEADER

	, @_PRIMARY_KEY					      INT					       = NULL		OUTPUT
	, @_VERSION						        INT					       = NULL	

  , @tx_object_type             VARCHAR(256)       = NULL
  , @id_ref_key                 INT                = NULL
  , @id_doc_key                 INT                = NULL
	, @tx_doc_type   					    VARCHAR(256)			 = NULL   
  , @int_upload_status          INT                = NULL   
  , @tx_download_link				  	VARCHAR(256)       = NULL
  , @int_is_mandatory					  INT 					     = NULL
  , @tx_document_name   				VARCHAR(256)       = NULL
  , @tx_document_path           VARCHAR(256)       = NULL
  , @int_file_present           INT                = NULL
  , @id_card_type_key           INT                = NULL
  , @id_customer_type_key       INT                = NULL

   _SP_PARAM_FOOTER

AS

{
  _SP_HEADER

  IF( @tx_action_name = 'NEW_CIB_STATUS')
  {
    DECLARE @l_id_card_doc_key INT = 
    ( 
      SELECT  id_ref_key FROM  T_DOCUMENT 
      WHERE id_ref_key     = @id_ref_key
      AND   tx_doc_type     = 'CIB_STATUS'
      AND   is_active       = 1
    )

    IF (@@l_id_card_doc_key IS NULL)
    {
      SET @tx_action_name = _ACTION_NEW
    }
    ELSE
    {
      SET @id_document_key = @l_id_card_doc_key
      SET @tx_action_name = _ACTION_UPDATE
    }
  }
  IF ( @tx_action_name = 'SELECT_ATTACHMENT_MULTIPLE_FILE' )
  {
    SELECT   tx_rs_type = 'RS_TYPE_SELECT_ATTACHMENT_MULTIPLE_REPORT'
    , L.*
    FROM  T_DOCUMENT L
    WHERE id_ref_key     = @id_ref_key
    AND   L.tx_doc_type = 'CIB_STATUS'
    AND   is_active       = 1
    ORDER BY L.dtt_mod DESC
  }

  IF ( @tx_action_name = 'SELECT_ATTACHMENT_SINGLE_FILE' )
  {
    SELECT   tx_rs_type = 'RS_TYPE_DOCUMENT'
    , L.*
    FROM  T_DOCUMENT L
    WHERE id_document_key     = @id_document_key
    AND   is_active       = 1
    ORDER BY L.dtt_mod DESC
  }

  IF ( @tx_action_name = 'NEW_MOBILE_VIEW' )
  {
    DECLARE @ll_id_card_doc_key INT = 
    (
      SELECT id_document_key FROM T_DOCUMENT
      WHERE id_ref_key = @id_ref_key
      AND tx_doc_type = @tx_doc_type
    )

    IF(@ll_id_card_doc_key IS NOT NULL)
    {
      SET @id_document_key = @ll_id_card_doc_key
      SET @tx_action_name = _ACTION_UPDATE
    }
    ELSE
    {
      _SET_ACTION(_ACTION_NEW)
    }
  }
  IF ( @tx_action_name = 'SELECT_DOC_BY_CARD_ID_DOC_TYPE' )
  {
    SELECT  tx_rs_type = 'RS_TYPE_CARD_DOCUMENT'
    , L.*
    FROM  T_DOCUMENT L
    WHERE id_document_key = ISNULL(@id_document_key   ,id_document_key)
    AND   id_ref_key     = ISNULL(@id_ref_key       , id_ref_key)
    AND   tx_doc_type  = ISNULL(@tx_doc_type       , tx_doc_type)
    AND   is_active       = 1
    ORDER BY int_is_mandatory DESC, tx_doc_type ASC
  }

  IF ( @tx_action_name = _ACTION_NEW )
  {
    INSERT INTO _TABLE_NAME
    (
     id_document_ver
     ,_TABLE_HEADER_INS_FIELD_WITH_STATE

     ,tx_object_type
     ,id_ref_key
     ,id_doc_key
     ,tx_doc_type
     ,int_upload_status
     ,tx_download_link
     ,int_is_mandatory
     ,tx_document_name
     ,tx_document_path
     ,int_file_present
    )
    VALUES
    (
      0
      ,_TABLE_HEADER_INS_VAL_WITH_STATE

      , ISNULL(@tx_object_type           , _DB_NULL_STR)
      , ISNULL(@id_ref_key               , _DB_NULL_INT)
      , ISNULL(@id_doc_key               , _DB_NULL_INT)
      , ISNULL(@tx_doc_type              , _DB_NULL_STR)
      , ISNULL(@int_upload_status        , _DB_NULL_INT)
      , ISNULL(@tx_download_link         , _DB_NULL_STR)
      , ISNULL(@int_is_mandatory         , _DB_NULL_INT)
      , ISNULL(@tx_document_name         , _DB_NULL_STR)
      , ISNULL(@tx_document_path         , _DB_NULL_STR)
      , ISNULL(@int_file_present         , 0)
    )

    SELECT @_PRIMARY_KEY = IDENT_CURRENT('T_DOCUMENT')

    _STORE_SYS_VARS     
    SELECT @g_tx_err_msg = _GEM_INSERT(_TABLE_NAME, @_PRIMARY_KEY)
    _HANDLE_ZERO_ROW_COUNT(_GEC_INSERT, @g_tx_err_msg)

    _TOUCHED_TABLE(_TABLE_NAME)

    _SP_FOOTER

    RETURN _STATUS_OK 
  }   

  IF ( @tx_action_name = _ACTION_SELECT )
  {
    SELECT  tx_rs_type = 'RS_TYPE_DOCUMENT'
    , L.*
    FROM  _TABLE_NAME L
    WHERE id_document_key = ISNULL(@id_document_key   ,id_document_key)
    AND   id_ref_key     = ISNULL(@id_ref_key       , id_ref_key)
    AND   tx_object_type  = ISNULL(@tx_object_type       , tx_object_type)
    AND   is_active       = 1
    ORDER BY int_is_mandatory DESC, tx_doc_type ASC
  }

  IF (@tx_action_name = _ACTION_DELETE)
  { 
    _SET_ACTION(_ACTION_UPDATE)
    , @is_active = 0
  }

  IF( @tx_action_name = _ACTION_UPDATE )
  {
    UPDATE _TABLE_NAME
    SET 
    _TABLE_HEADER_UPD_WITH_STATE

    , tx_object_type             = ISNULL(@tx_object_type             ,tx_object_type)
    , id_ref_key                 = ISNULL(@id_ref_key                 ,id_ref_key)
    , id_doc_key                 = ISNULL(@id_doc_key                 ,id_doc_key)
    , tx_doc_type                = ISNULL(@tx_doc_type                ,tx_doc_type)
    , int_upload_status          = ISNULL(@int_upload_status          ,int_upload_status)
    , tx_download_link           = ISNULL(@tx_download_link           ,tx_download_link)
    , int_is_mandatory           = ISNULL(@int_is_mandatory           ,int_is_mandatory)
    , tx_document_name           = ISNULL(@tx_document_name           ,tx_document_name)
    , tx_document_path           = ISNULL(@tx_document_path           ,tx_document_path)
    , int_file_present           = ISNULL(@int_file_present           ,int_file_present)

    WHERE   id_document_key      = @id_document_key
    AND     is_active = 1
  }

  IF ( @tx_action_name = 'SELECT_CARD_ALL_DOCUMENT' )
  {
     SELECT D.id_document_key
     , D.id_ref_key
     , D.id_doc_key
     , D.tx_doc_type
     , D.int_is_mandatory
     , D.int_file_present
     , D.int_upload_status
    INTO #TEMP_T_CARD_DOCUMENT
    FROM T_DOCUMENT D
    WHERE D.id_ref_key = @id_ref_key
    AND   D.tx_doc_type     != 'CIB_STATUS' 
    AND   D.is_active = 1

    SELECT NULL AS id_document_key
    , @id_ref_key AS id_ref_key
    , C.id_configuration_key AS id_doc_key
    , C.tx_value1 AS tx_doc_type
    , M.is_mandatory AS int_is_mandatory
    , 0 AS int_file_present
    , 0 AS int_upload_status
    INTO #TEMP_T_CARD_DOCUMENT_2
    FROM T_CONFIGURATION C
    JOIN T_CARD_DOC_MAP M ON M.id_doc_key = C.id_configuration_key
    JOIN T_CARD_CONFIG LC ON LC.id_card_config_key = M.id_card_config_key
    WHERE LC.id_card_type_key = @id_card_type_key
    AND LC.id_customer_type_key = @id_customer_type_key
    AND C.tx_value1 NOT IN 
    (
      SELECT tx_doc_type FROM #TEMP_T_CARD_DOCUMENT
    )
    AND M.is_active = 1
    AND C.is_active = 1
    AND LC.is_active = 1

    SELECT DISTINCT tx_rs_type = 'RS_TYPE_CARD_DOCUMENT', X.tx_doc_type ,X.*
    FROM
    (
      SELECT * FROM #TEMP_T_CARD_DOCUMENT
      UNION
      SELECT * FROM #TEMP_T_CARD_DOCUMENT_2
    ) X
    ORDER BY X.tx_doc_type ASC, X.int_is_mandatory DESC
  }

  IF ( @tx_action_name = 'DELETE_DOC_FOR_EXISTING_CARD')
  {
    UPDATE T_DOCUMENT 
    SET is_active = 0
    WHERE id_ref_key     = @id_ref_key
    AND id_doc_key  = @id_doc_key
    AND   tx_doc_type     != 'CIB_STATUS' 
  }

  IF ( @tx_action_name = 'SELECT_CIB_STATUS_DOC' )
  {
    SELECT  tx_rs_type = 'RS_TYPE_DOCUMENT'
    , L.*
    FROM  T_DOCUMENT L
    WHERE id_ref_key     = ISNULL(@id_ref_key       , id_ref_key)
    AND   tx_doc_type     = ISNULL(@tx_doc_type       , tx_doc_type) 
    AND   is_active       = 1
  }

  _SP_FOOTER
}
go

_GRANT_PERM_SP