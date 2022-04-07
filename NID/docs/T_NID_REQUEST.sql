table : T_NID_REQUEST
We can use JPA for this table

Column
	id_nid_request_key [auto increment]
	id_nid_request_ver
	#naztech_common_column#
	dtt_request				DATETIME
	dtt_response			DATETIME
	
	is_valid_req			int 	-- 1=valid, 0=invalid
	int_data_source			int		[1 = local cache, 2 = nid server , ...]
	is_success_req			int 	-- If we found NId either local cache or nid server than it is success[1], else fail[0]
	int_match_percentage 	int 
	tx_comments 			varchar(512) 



Docs:
	Every time we should insert a request when it first come with valid/invalid by validating some basics structure.
		validation point
			header
				apiKey
				contentType
				actionType
				requestType
				callbackUrl --CONDITIONAL
			payload
				mandatory field in payload

	set default success status [fail]
	if invalid request
		mard request is invalid
		Insert to T_NID_REQUEST
		send response with error text
	else
		mark as valid
		Insert to T_NID_REQUEST
		go further processing
	
	If We able to send NID data 
		update T_NID_REQUEST with success

	Send response




