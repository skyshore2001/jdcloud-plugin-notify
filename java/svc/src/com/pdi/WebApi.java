class AC2_Notify extends AccessControl
{
	@Override
	protected void onInit() throws Exception {
		this.allowedAc = asList("query");
	}

	@Override
	public Object api_query() throws Exception {
		Object rv = queryAll("SELECT 'Issue' type, name, tm, id relId, status FROM Issue WHERE status<>'CL' LIMIT 100", true);
		return rv;
	}

	public Object api_queryCnt() throws Exception {
		Object rv = queryOne("SELECT COUNT(*) FROM Issue WHERE status<>'CL'");
		return asMap("cnt", rv);
	}
}
