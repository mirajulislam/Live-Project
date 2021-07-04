/* __VER_INFO__  :  */
/******************************************************************************
* Author		: Kh. Kamruzzaman
* Date			: 2019-12-29
* Description	: 
******************************************************************************/

#include <nSMART_SQL.h>

#define _SP_NAME 			{ACT_comment};
#define _TABLE_NAME 		{T_COMMENT};
#define _PRIMARY_KEY		{id_comment_key};
#define _VERSION			{id_comment_ver};


_DROP_PROC

_CREATE_PROC (_SP_NAME)

	_SP_PARAM_HEADER

		, @_PRIMARY_KEY					int								= NULL		OUTPUT
		, @_VERSION						int								= NULL		OUTPUT
		, @tx_object_type				varchar(64)						= NULL
		, @tx_comment_type				varchar(64)						= NULL
		, @id_ref_key					int								= NULL								 
		, @tx_comment					varchar(MAX)					= NULL
		
		, @dtt_created_date				datetime						= NULL
		, @tx_commented_by				varchar(128)					= NULL

		, @tx_comment_response			varchar(MAX)					= NULL
		, @tx_comment_response_by		varchar(128)					= NULL

	_SP_PARAM_FOOTER
AS
{

	_SP_HEADER

	IF ( @tx_action_name = _ACTION_NEW )
	{
		_INIT_VERSION(@_VERSION)

		INSERT INTO _TABLE_NAME
	    (
		    _VERSION
		    ,_TABLE_HEADER_INS_FIELD_WITH_STATE
		          
		    , tx_object_type	                 
		    , tx_comment_type	                 
		    , id_ref_key		               
		    , tx_comment
		    , dtt_created_date
			, tx_commented_by
			, tx_comment_response	
			, tx_comment_response_by
	    )
	    VALUES
	    (  
		    @_VERSION
		    ,_TABLE_HEADER_INS_VAL_WITH_STATE

		    , ISNULL(@tx_object_type	             , _DB_NULL_STR)
		    , ISNULL(@tx_comment_type	             , _DB_NULL_STR)
		    , ISNULL(@id_ref_key		             , _DB_NULL_INT)
		    , ISNULL(@tx_comment		             , _DB_NULL_STR)
		    , ISNULL(@dtt_created_date		         , GETDATE())
		    , ISNULL(@tx_commented_by		         , _DB_NULL_STR)
		    , ISNULL(@tx_comment_response		     , _DB_NULL_STR)
		    , ISNULL(@tx_comment_response_by		 , _DB_NULL_STR)
	    )

	    SELECT @_PRIMARY_KEY = IDENT_CURRENT('T_COMMENT')

		_STORE_SYS_VARS
		SELECT @g_tx_err_msg = _GEM_INSERT(_TABLE_NAME, @_PRIMARY_KEY)
		
		_HANDLE_ZERO_ROW_COUNT(_GEC_INSERT, @g_tx_err_msg)

		_TOUCHED_TABLE(_TABLE_NAME)

		_SET_ACTION('SELECT_ON_ACTION')
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
		, tx_comment             = ISNULL(@tx_comment,tx_comment)
		, tx_comment_response    = ISNULL(@tx_comment_response,tx_comment_response)
		, tx_comment_response_by = ISNULL(@tx_comment_response_by,tx_comment_response_by)
		WHERE   _PRIMARY_KEY     = @_PRIMARY_KEY
		AND     is_active = 1
		
		_TOUCHED_TABLE(_TABLE_NAME)

		_SET_ACTION('SELECT_ON_ACTION')

	}

	IF ( @tx_action_name = 'SELECT_ALL_QUERY' )
	{
		SELECT  tx_rs_type = 'RS_TYPE_COMMENT'
		, L.*
		FROM  T_COMMENT L
		WHERE 	id_ref_key      	= @id_ref_key
		AND 	tx_comment_type     LIKE '%QUERY%'
		AND     is_active = 1
	}

	IF ( @tx_action_name = _ACTION_SELECT )
	{
		SELECT  tx_rs_type = 'RS_TYPE_COMMENT'
		, L.*
		FROM  _TABLE_NAME L
		WHERE 	_PRIMARY_KEY        = ISNULL(@_PRIMARY_KEY      	,_PRIMARY_KEY)
		AND 	tx_object_type  	= ISNULL(@tx_object_type		,tx_object_type)
		AND 	tx_comment_type     = ISNULL(@tx_comment_type		,tx_comment_type)
		AND 	id_ref_key      	= ISNULL(@id_ref_key			,id_ref_key)
		AND     is_active = 1
	}

	IF ( @tx_action_name = 'SELECT_ON_ACTION' )
	{
		SELECT  tx_rs_type = 'RS_TYPE_COMMENT'
		, L.*
		FROM  _TABLE_NAME L
		WHERE 	tx_object_type  	= @tx_object_type
		AND 	tx_comment_type     = @tx_comment_type
		AND 	id_ref_key      	= @id_ref_key
		AND    is_active = 1
	}

	_SP_FOOTER
}
go


_GRANT_PERM_SP