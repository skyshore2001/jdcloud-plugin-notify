<?php
class AC2_Notify extends AccessControl
{
	protected $allowedAc = ["query"];

	function api_query() {
		$rv = queryAll("SELECT type, count(*) name FROM Item WHERE status='待审核' GROUP BY type
UNION
SELECT '会议室预订' type, count(*) name FROM RoomOrder WHERE status='待确认' GROUP BY type
", true);
		setRet(0, ["list"=>$rv]);
		throw new DirectReturn();
	}

	function api_queryCnt() {
		$cnt = queryOne("SELECT (SELECT count(*) cnt FROM Item WHERE status='待审核') +
(SELECT count(*) cnt FROM RoomOrder WHERE status='待确认') cnt");
		return ["cnt" => $cnt];
	}
}
