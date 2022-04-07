table : T_NID

Column
	id_nid_key [auto increment]
	id_nid_ver
	#naztech_common_column#
	id_nid_request_key int
	tx_nid				16
	dt_dob				Date
	tx_father_name 		128
	tx_mother_name 		128
	tx_blood_group		4
	tx_addr_line_1		128
	tx_addr_line_2 		128
	tx_name				128
	tx_post_office		128
	int_post_code		8
	tx_police_station	64
	tx_district 		64
	tx_division 		64

	dt_nid_issue_date 	DATE

	dtt_extract_time 	DATETIME

	
	tx_nid_image_path 	256
	tx_nid_image_name	128



