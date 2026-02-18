import { GoogleGenerativeAI } from "@google/generative-ai";
import { AI_SYSTEM_INSTRUCTION, SERVICES, PHONE, EMAIL, LOCATION, OWNER_NAME } from '../constants';

// ═══════════════════════════════════════════════════════════════════════════════
// SUPER ENGINEER KNOWLEDGE BASE - LEVEL 3 ICT SUPPORT
// ═══════════════════════════════════════════════════════════════════════════════

const KB: Record<string, { kw: string[]; r: string }> = {

// ══════════════════════════════════════════════════════════════════════════════
// NETWORKING - ADVANCED
// ══════════════════════════════════════════════════════════════════════════════

dns: { kw: ['dns', 'nslookup', 'name resolution', 'dns server', 'dns not resolving'],
r: `**DNS Troubleshooting (L3):**

\`\`\`powershell
nslookup domain.com
ipconfig /flushdns
nslookup domain.com 8.8.8.8
Resolve-DnsName -Name domain.com -Type A
\`\`\`

**Issues & Fixes:**
1. **Cache Poisoning:** \`ipconfig /flushdns\`, check hosts file
2. **Server Not Responding:** Try 8.8.8.8 or 1.1.1.1
3. **AD DNS:** \`dcdiag /test:dns\`, verify SRV records
4. **Zone Transfer:** Check port 53, verify permissions

Need DNS architecture? ${PHONE}` },

dhcp: { kw: ['dhcp', 'no ip', '169.254', 'apipa', 'ip address automatic'],
r: `**DHCP Troubleshooting (L3):**

\`\`\`powershell
ipconfig /release; ipconfig /renew
Get-DhcpServerv4Scope
Get-DhcpServerv4Lease -ScopeId 192.168.1.0
\`\`\`

**169.254.x.x (APIPA):** DHCP unreachable
- Check DHCP server status
- Verify scope has addresses
- Check relay agent for cross-subnet

**Fixes:** Expand scope, check rogue DHCP with \`dhcploc.exe\`

DHCP design? ${PHONE}` },

firewall: { kw: ['firewall', 'blocked', 'port', 'allow traffic', 'inbound', 'outbound'],
r: `**Firewall Troubleshooting (L3):**

\`\`\`powershell
Get-NetFirewallProfile | Select Name, Enabled
Test-NetConnection -ComputerName server -Port 443
New-NetFirewallRule -DisplayName "Allow" -Direction Inbound -Port 443 -Protocol TCP -Action Allow
\`\`\`

**Common Ports:** HTTP:80, HTTPS:443, RDP:3389, SMB:445, SQL:1433, DNS:53

**Checklist:**
- Check both inbound AND outbound
- Review Windows Event Log → Security
- Packet capture with Wireshark

Firewall architecture? ${PHONE}` },

vlan: { kw: ['vlan', 'trunk', 'tagged', '802.1q', 'network segment'],
r: `**VLAN Troubleshooting (L3):**

**Diagnostic:** \`show vlan brief\`, \`show interfaces trunk\`

**Issues:**
1. **Can't reach other VLAN:** Check inter-VLAN routing, SVI status
2. **Trunk not working:** Native VLAN mismatch, encapsulation
3. **VLAN not propagating:** VTP mode, domain, password

**Best Practices:** Avoid VLAN 1 for data, use voice VLANs for QoS

VLAN design? ${PHONE}` },

vpn: { kw: ['vpn', 'tunnel', 'ipsec', 'remote access', 'site to site', 'l2tp'],
r: `**VPN Troubleshooting (L3):**

**Ports:** IKEv2: UDP 500/4500, L2TP: 1701, SSTP: 443, OpenVPN: 1194

**Client Issues:**
- Verify credentials/certificates
- Check firewall ports
- Test: \`rasdial "VPN" user pass\`

**Site-to-Site IPSec:**
- Phase 1: PSK match, encryption/hash algorithms
- Phase 2: Transform sets, interesting traffic

**Fixes:** NAT-T, split tunneling, MTU clamping

VPN setup? ${PHONE}` },

routing: { kw: ['routing', 'route', 'gateway', 'bgp', 'ospf', 'static route', 'default gateway'],
r: `**Routing Troubleshooting (L3):**

\`\`\`cmd
route print
tracert destination
pathping destination
\`\`\`

**PowerShell:**
\`\`\`powershell
Get-NetRoute
New-NetRoute -DestinationPrefix "10.0.0.0/8" -NextHop "192.168.1.1" -InterfaceIndex 12
\`\`\`

**BGP/OSPF Issues:**
- Neighbor adjacency
- Route redistribution
- AS path/metrics

**Common Fixes:**
- Verify gateway is reachable
- Check routing table for conflicts
- Verify subnet masks

Routing architecture? ${PHONE}` },

wifi: { kw: ['wifi', 'wireless', 'wlan', 'access point', 'wifi slow'],
r: `**WiFi Troubleshooting:**

\`\`\`cmd
netsh wlan show interfaces
netsh wlan show profiles
netsh wlan disconnect; netsh wlan connect name="SSID"
\`\`\`

**Quick Fixes:**
1. Restart router (30 sec)
2. Forget & reconnect
3. Check channel congestion (use 5GHz)
4. Update wireless drivers

**Enterprise 802.1X:** Check RADIUS, NPS policies, certs

WiFi survey? ${PHONE}` },

// ══════════════════════════════════════════════════════════════════════════════
// ACTIVE DIRECTORY & IDENTITY
// ══════════════════════════════════════════════════════════════════════════════

activedirectory: { kw: ['active directory', ' ad ', 'domain controller', 'ldap', 'domain'],
r: `**Active Directory Troubleshooting (L3):**

\`\`\`cmd
dcdiag /v
repadmin /replsummary
nltest /dsgetdc:domain.com
\`\`\`

**PowerShell:**
\`\`\`powershell
Get-ADDomainController -Filter *
Get-ADUser -Filter {LockedOut -eq $true}
Unlock-ADAccount -Identity user
\`\`\`

**Common Issues:**
1. **Replication:** Check DNS SRV, time sync (5 min max)
2. **Login fails:** Account locked? Password expired? \`klist\` for Kerberos
3. **DC not found:** DNS, site/subnet config

AD migration? ${PHONE}` },

gpo: { kw: ['gpo', 'group policy', 'gpupdate', 'gpresult', 'policy not applying'],
r: `**Group Policy Troubleshooting (L3):**

\`\`\`cmd
gpupdate /force
gpresult /r
gpresult /h C:\\gpreport.html
\`\`\`

**GPO Not Applying:**
1. User in correct OU?
2. Security filtering includes user?
3. WMI filter blocking?
4. Link enabled? Enforced?
5. SYSVOL replicated? \`dcdiag /test:sysvolcheck\`

**PowerShell:**
\`\`\`powershell
Get-GPO -All
Get-GPResultantSetOfPolicy -ReportType Html -Path rsop.html
\`\`\`

GPO architecture? ${PHONE}` },

adfs: { kw: ['adfs', 'federation', 'saml', 'sso', 'single sign-on', 'claims'],
r: `**ADFS Troubleshooting (L3):**

**Health Check:**
\`\`\`powershell
Get-AdfsProperties
Get-AdfsSslCertificate
Test-AdfsServerHealth
\`\`\`

**Common Issues:**
1. **SSO Fails:** Certificate expired, token lifetime
2. **Claims:** Check claim rules, transform rules
3. **Federation:** Metadata sync, trust relationship

**Event Log:** Applications → AD FS/Admin

**Endpoints:** /adfs/ls, /FederationMetadata/2007-06

ADFS setup? ${PHONE}` },

azuread: { kw: ['azure ad', 'entra', 'azure active directory', 'aad connect', 'hybrid identity'],
r: `**Azure AD / Entra ID Troubleshooting (L3):**

**Sync Issues (Azure AD Connect):**
\`\`\`powershell
Start-ADSyncSyncCycle -PolicyType Delta
Get-ADSyncScheduler
\`\`\`

**Check sync:** portal.azure.com → Azure AD → Azure AD Connect

**Common Issues:**
1. **Object not syncing:** Check filtering, immutableId conflicts
2. **Password hash sync:** Enable in Connect wizard
3. **Pass-through auth:** Agent status on-prem

**Conditional Access:** Check sign-in logs for policy blocks

Hybrid identity design? ${PHONE}` },

// ══════════════════════════════════════════════════════════════════════════════
// MICROSOFT 365 & EXCHANGE
// ══════════════════════════════════════════════════════════════════════════════

microsoft365: { kw: ['microsoft 365', 'm365', 'office 365', 'o365', 'teams', 'sharepoint', 'onedrive'],
r: `**Microsoft 365 Troubleshooting (L3):**

**Admin Centers:**
- admin.microsoft.com
- admin.exchange.microsoft.com
- entra.microsoft.com

**PowerShell:**
\`\`\`powershell
Connect-ExchangeOnline
Connect-MgGraph -Scopes "User.Read.All"
Get-MgUser -All
\`\`\`

**Common Issues:**
1. **License:** Verify assignment in admin portal
2. **Teams:** Clear cache %appdata%\\Microsoft\\Teams
3. **OneDrive:** Reset with \`onedrive.exe /reset\`
4. **SharePoint:** Check permissions, site collection settings

M365 migration? ${PHONE}` },

exchange: { kw: ['exchange', 'mail flow', 'mailbox', 'smtp', 'email server', 'transport rule'],
r: `**Exchange Troubleshooting (L3):**

**Exchange Online:**
\`\`\`powershell
Get-MessageTrace -SenderAddress user@domain.com
Get-TransportRule
Get-MailboxFolderStatistics -Identity user
\`\`\`

**On-Prem:**
\`\`\`powershell
Get-Queue
Test-ServiceHealth
Get-MailboxDatabaseCopyStatus
\`\`\`

**Mail Flow Issues:**
1. Message trace for delivery
2. Check connectors, transport rules
3. Verify MX, SPF, DKIM, DMARC
4. Review quarantine

Exchange migration? ${PHONE}` },

teams: { kw: ['teams', 'microsoft teams', 'teams call', 'teams meeting', 'teams not working'],
r: `**Microsoft Teams Troubleshooting:**

**Quick Fixes:**
1. Clear cache: \`%appdata%\\Microsoft\\Teams\` → delete all
2. Sign out → sign in
3. Reset: Settings → Reset app

**Call Quality:**
\`\`\`powershell
Get-CsOnlineUser -Identity user@domain.com
Get-CsUserPolicyAssignment -Identity user
\`\`\`

**Admin Issues:**
- Policies not applying: Check policy assignment
- External access: External access settings in admin
- Guest access: Org-wide settings

Teams deployment? ${PHONE}` },

// ══════════════════════════════════════════════════════════════════════════════
// AZURE & CLOUD
// ══════════════════════════════════════════════════════════════════════════════

azure: { kw: ['azure', 'azure vm', 'cloud', 'resource group', 'subscription', 'iaas'],
r: `**Azure Troubleshooting (L3):**

**CLI:**
\`\`\`bash
az login
az vm list --output table
az vm start --resource-group RG --name VM
\`\`\`

**PowerShell:**
\`\`\`powershell
Connect-AzAccount
Get-AzVM
Get-AzNetworkSecurityGroup
\`\`\`

**VM Not Accessible:**
- Check NSG inbound rules
- Boot diagnostics screenshot
- Serial console access
- Azure Status page

**Costs:** Cost Management, Reserved Instances, right-sizing

Azure architecture? ${PHONE}` },

aws: { kw: ['aws', 'amazon web services', 'ec2', 's3', 'lambda', 'cloudformation'],
r: `**AWS Troubleshooting (L3):**

**CLI:**
\`\`\`bash
aws ec2 describe-instances
aws s3 ls
aws logs tail /aws/lambda/function-name
\`\`\`

**EC2 Issues:**
- Security Groups (stateful firewall)
- Instance status checks
- CloudWatch metrics/logs

**Common Services:**
- **EC2:** Virtual machines
- **S3:** Object storage
- **RDS:** Managed databases
- **Lambda:** Serverless functions
- **VPC:** Virtual networking

AWS architecture? ${PHONE}` },

// ══════════════════════════════════════════════════════════════════════════════
// VIRTUALIZATION
// ══════════════════════════════════════════════════════════════════════════════

hyperv: { kw: ['hyper-v', 'hyperv', 'virtual machine', 'vm not starting', 'vhdx'],
r: `**Hyper-V Troubleshooting (L3):**

\`\`\`powershell
Get-VM
Get-VMHost
Get-VMSwitch
Start-VM -Name "VM"
Checkpoint-VM -Name "VM" -SnapshotName "Backup"
\`\`\`

**VM Won't Start:**
- Check memory on host
- Verify VHD path exists
- Integration services version
- Event Log: Hyper-V-VMMS

**Performance:**
- Dynamic memory
- SSD for VMs
- Separate VHDs from OS

Hyper-V design? ${PHONE}` },

vmware: { kw: ['vmware', 'esxi', 'vcenter', 'vsphere', 'vmotion'],
r: `**VMware Troubleshooting (L3):**

**ESXi CLI:**
\`\`\`bash
esxcli vm process list
esxcli network nic list
vim-cmd vmsvc/getallvms
vim-cmd vmsvc/power.off [vmid]
\`\`\`

**Issues:**
1. **VM stuck:** \`esxcli vm process kill\`
2. **vMotion fails:** CPU compatibility (EVC), network
3. **Performance:** Balloon driver, storage latency

**Best Practices:** DRS, HA, Update Manager

VMware infrastructure? ${PHONE}` },

docker: { kw: ['docker', 'container', 'dockerfile', 'docker compose', 'image'],
r: `**Docker Troubleshooting (L3):**

\`\`\`bash
docker ps -a
docker logs container_name
docker exec -it container_name /bin/bash
docker system prune -a
docker-compose up -d
docker-compose logs -f
\`\`\`

**Common Issues:**
1. **Container exits:** Check logs, entry point
2. **Networking:** Bridge, host, overlay modes
3. **Storage:** Volumes vs bind mounts
4. **Resources:** --memory, --cpus limits

**Dockerfile Best Practices:**
- Multi-stage builds
- .dockerignore
- Non-root user

Container strategy? ${PHONE}` },

kubernetes: { kw: ['kubernetes', 'k8s', 'kubectl', 'pod', 'deployment', 'cluster'],
r: `**Kubernetes Troubleshooting (L3):**

\`\`\`bash
kubectl get pods -A
kubectl describe pod pod-name
kubectl logs pod-name -c container
kubectl exec -it pod-name -- /bin/bash
kubectl get events --sort-by='.lastTimestamp'
\`\`\`

**Pod Issues:**
- **Pending:** Resources, node selector
- **CrashLoopBackOff:** Check logs, liveness probe
- **ImagePullBackOff:** Registry auth, image name

**Debugging:**
\`\`\`bash
kubectl run debug --image=busybox -it --rm
kubectl port-forward pod-name 8080:80
\`\`\`

K8s architecture? ${PHONE}` },

// ══════════════════════════════════════════════════════════════════════════════
// WINDOWS SERVER ROLES
// ══════════════════════════════════════════════════════════════════════════════

windowsserver: { kw: ['windows server', 'server 2019', 'server 2022', 'server roles'],
r: `**Windows Server Troubleshooting (L3):**

**Health Check:**
\`\`\`powershell
Get-WindowsFeature | Where Installed
Get-Service | Where Status -eq Running
Get-EventLog -LogName System -Newest 50 -EntryType Error
\`\`\`

**Common Roles:**
- AD DS, AD CS, AD FS
- DNS, DHCP
- File Services, DFS
- IIS, WSUS
- Hyper-V, RDS

**Best Practices:**
- Server Core for security
- Regular patching
- Monitoring & alerting

Server deployment? ${PHONE}` },

iis: { kw: ['iis', 'web server', 'application pool', 'binding', 'asp.net'],
r: `**IIS Troubleshooting (L3):**

\`\`\`powershell
Import-Module WebAdministration
Get-Website
Get-WebAppPoolState
Restart-WebAppPool -Name "AppPool"
Get-WebBinding -Name "Site"
\`\`\`

**Common Issues:**
1. **503 Error:** App pool stopped/crashed
2. **500 Error:** Check app logs, web.config
3. **SSL:** Certificate binding, expiry
4. **Performance:** Worker processes, recycling

**Logs:** C:\\inetpub\\logs\\LogFiles

IIS architecture? ${PHONE}` },

rds: { kw: ['rds', 'remote desktop', 'terminal server', 'rdp', 'remote app'],
r: `**Remote Desktop Services (L3):**

\`\`\`powershell
Get-RDSessionHost -CollectionName "Collection"
Get-RDUserSession
Disconnect-RDUser -HostServer server -UnifiedSessionID 1
\`\`\`

**Issues:**
1. **Can't connect:** Licensing, CALs, network
2. **Slow:** Check server resources, profile size
3. **Printing:** Redirect settings, driver compatibility

**Components:**
- Connection Broker
- Session Host
- Web Access
- Gateway

RDS deployment? ${PHONE}` },

wsus: { kw: ['wsus', 'windows update', 'patch management', 'updates'],
r: `**WSUS Troubleshooting (L3):**

**Client:**
\`\`\`cmd
wuauclt /detectnow /reportnow
usoclient StartScan
\`\`\`

**PowerShell:**
\`\`\`powershell
Get-WsusServer
Get-WsusUpdate -Approval Unapproved
Approve-WsusUpdate -Update $update -Action Install
\`\`\`

**Issues:**
1. **Not reporting:** GPO, WUServer registry
2. **Sync fails:** Proxy, disk space
3. **DB growth:** Cleanup wizard, decline superseded

Patch strategy? ${PHONE}` },

dfs: { kw: ['dfs', 'distributed file system', 'namespace', 'replication'],
r: `**DFS Troubleshooting (L3):**

\`\`\`powershell
Get-DfsrMember
Get-DfsReplicationGroup
Get-DfsrBacklog -SourceComputerName SRV1 -DestinationComputerName SRV2 -GroupName "Group"
dfsrdiag PollAD
\`\`\`

**Namespace Issues:**
- Referral ordering
- Root vs domain-based
- Access-based enumeration

**Replication Issues:**
- Staging quota
- Conflict handling
- Initial sync

DFS design? ${PHONE}` },

// ══════════════════════════════════════════════════════════════════════════════
// LINUX
// ══════════════════════════════════════════════════════════════════════════════

linux: { kw: ['linux', 'ubuntu', 'centos', 'rhel', 'debian', 'bash'],
r: `**Linux Troubleshooting (L3):**

**System Info:**
\`\`\`bash
uname -a
cat /etc/os-release
df -h
free -m
top / htop
\`\`\`

**Services:**
\`\`\`bash
systemctl status service
systemctl restart service
journalctl -u service -f
\`\`\`

**Networking:**
\`\`\`bash
ip addr
ss -tulpn
netstat -an
ping / traceroute
\`\`\`

**Logs:** /var/log/syslog, /var/log/messages

Linux support? ${PHONE}` },

apache: { kw: ['apache', 'httpd', 'apache2', 'web server linux'],
r: `**Apache Troubleshooting (L3):**

\`\`\`bash
systemctl status apache2
apachectl configtest
tail -f /var/log/apache2/error.log
apache2ctl -S
\`\`\`

**Common Issues:**
1. **Won't start:** Config error, port conflict
2. **403 Forbidden:** Permissions, .htaccess
3. **500 Error:** Check error.log, PHP errors
4. **SSL:** Certificate path, mod_ssl

**Virtual Hosts:** /etc/apache2/sites-available/

Apache optimization? ${PHONE}` },

nginx: { kw: ['nginx', 'reverse proxy', 'load balancer'],
r: `**Nginx Troubleshooting (L3):**

\`\`\`bash
systemctl status nginx
nginx -t
tail -f /var/log/nginx/error.log
\`\`\`

**Common Issues:**
1. **502 Bad Gateway:** Backend down, socket issue
2. **504 Timeout:** proxy_read_timeout
3. **SSL:** Certificate chain, ssl_certificate

**Reverse Proxy:**
\`\`\`nginx
location / {
    proxy_pass http://backend:3000;
    proxy_set_header Host $host;
}
\`\`\`

Nginx architecture? ${PHONE}` },

// ══════════════════════════════════════════════════════════════════════════════
// SECURITY
// ══════════════════════════════════════════════════════════════════════════════

security: { kw: ['security', 'breach', 'incident', 'hacked', 'ransomware', 'attack'],
r: `**Security Incident Response (L3):**

⚠️ **IMMEDIATE ACTIONS:**
1. **Contain:** Isolate systems, block IPs, disable accounts
2. **Preserve:** Memory dumps, logs, screenshots
3. **Assess:** Scope, entry point, timeline

**Investigation:**
\`\`\`powershell
Get-WinEvent -FilterHashtable @{LogName='Security';ID=4624} -Max 50
Get-ScheduledTask | Where State -eq 'Ready'
netstat -ano | findstr ESTABLISHED
\`\`\`

**Ransomware:** ID variant, check nomoreransom.org, restore from offline backup

🚨 **ACTIVE BREACH? CALL: ${PHONE}**` },

certificates: { kw: ['certificate', 'ssl', 'tls', 'https', 'cert expired', 'pki'],
r: `**Certificate Troubleshooting (L3):**

\`\`\`powershell
Get-ChildItem Cert:\\LocalMachine\\My | Select Subject, NotAfter
Test-NetConnection -ComputerName server -Port 443
certutil -verify cert.cer
\`\`\`

**Issues:**
1. **Expired:** Renew, update binding, restart service
2. **Not Trusted:** Import root CA, check chain
3. **Name Mismatch:** SAN certificate, verify CN

**IIS Binding:**
\`\`\`powershell
New-WebBinding -Name "Site" -Protocol https -Port 443
\`\`\`

PKI design? ${PHONE}` },

mfa: { kw: ['mfa', 'multi-factor', '2fa', 'authenticator', 'two-factor'],
r: `**MFA Troubleshooting (L3):**

**Azure MFA:**
\`\`\`powershell
Get-MgUserAuthenticationMethod -UserId user@domain.com
\`\`\`

**Issues:**
1. **Can't register:** Check MFA registration policy
2. **Locked out:** Admin reset in Azure portal
3. **App not working:** Re-register, time sync on phone

**Best Practices:**
- FIDO2 keys for admins
- Number matching enabled
- Backup methods configured

MFA implementation? ${PHONE}` },

// ══════════════════════════════════════════════════════════════════════════════
// STORAGE & BACKUP
// ══════════════════════════════════════════════════════════════════════════════

storage: { kw: ['storage', 'disk', 'raid', 'san', 'nas', 'iscsi', 'disk full'],
r: `**Storage Troubleshooting (L3):**

\`\`\`powershell
Get-PhysicalDisk | Select FriendlyName, HealthStatus
Get-Volume
Get-StoragePool
\`\`\`

**RAID:**
- RAID 0: Stripe (no redundancy)
- RAID 1: Mirror
- RAID 5: Stripe + parity (1 disk loss)
- RAID 10: Mirror + stripe

**Disk Full:**
- WinDirStat analysis
- Clear temp files
- Shadow copies: \`vssadmin list shadows\`

Storage architecture? ${PHONE}` },

backup: { kw: ['backup', 'restore', 'disaster recovery', 'veeam', 'recovery'],
r: `**Backup & DR (L3):**

**Windows Backup:**
\`\`\`powershell
Get-WBSummary
wbadmin get versions
wbadmin start backup -backuptarget:E:
\`\`\`

**3-2-1 Rule:**
- 3 copies of data
- 2 different media
- 1 offsite

**Testing:**
- Monthly restore tests
- Document RTO/RPO
- Annual DR drill

Backup strategy? ${PHONE}` },

// ══════════════════════════════════════════════════════════════════════════════
// DATABASE
// ══════════════════════════════════════════════════════════════════════════════

sql: { kw: ['sql', 'sql server', 'database', 'query', 'mssql', 'deadlock'],
r: `**SQL Server Troubleshooting (L3):**

\`\`\`sql
SELECT name, state_desc FROM sys.databases
SELECT * FROM sys.dm_exec_requests WHERE blocking_session_id > 0
SELECT * FROM sys.dm_exec_query_stats ORDER BY total_worker_time DESC
\`\`\`

**Performance:**
- Missing indexes: sys.dm_db_missing_index_details
- Update statistics
- Query execution plans

**Issues:**
- Deadlocks: Trace flag 1222
- Connectivity: Port 1433, SQL Browser

SQL optimization? ${PHONE}` },

mysql: { kw: ['mysql', 'mariadb', 'mysql not starting'],
r: `**MySQL Troubleshooting (L3):**

\`\`\`bash
sudo systemctl status mysql
mysql -u root -p
SHOW PROCESSLIST;
SHOW ENGINE INNODB STATUS;
\`\`\`

**Performance:**
\`\`\`sql
EXPLAIN SELECT ...;
SHOW VARIABLES LIKE 'innodb_buffer_pool_size';
\`\`\`

**Common Issues:**
1. Won't start: Check error.log, disk space
2. Slow queries: Enable slow query log
3. Connection refused: bind-address, grants

MySQL tuning? ${PHONE}` },

// ══════════════════════════════════════════════════════════════════════════════
// SCRIPTING & AUTOMATION
// ══════════════════════════════════════════════════════════════════════════════

powershell: { kw: ['powershell', 'script', 'ps1', 'cmdlet', 'automation'],
r: `**PowerShell (L3):**

**Execution Policy:**
\`\`\`powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
\`\`\`

**Remote:**
\`\`\`powershell
Enter-PSSession -ComputerName Server01
Invoke-Command -ComputerName Server01 -ScriptBlock { Get-Service }
\`\`\`

**Error Handling:**
\`\`\`powershell
try {
    Get-Item "C:\\test" -ErrorAction Stop
} catch { Write-Error $_ }
\`\`\`

**Modules:** ActiveDirectory, Az, ExchangeOnlineManagement

Automation development? ${PHONE}` },

python: { kw: ['python', 'pip', 'python script', 'virtualenv'],
r: `**Python Troubleshooting:**

\`\`\`bash
python --version
pip list
pip install -r requirements.txt
python -m venv venv
source venv/bin/activate  # Linux
venv\\Scripts\\activate     # Windows
\`\`\`

**Common Issues:**
1. Module not found: pip install, check venv
2. Version conflicts: Use venv
3. Permission error: --user flag or venv

Python development? ${PHONE}` },

git: { kw: ['git', 'github', 'gitlab', 'repository', 'merge conflict', 'commit'],
r: `**Git Troubleshooting:**

\`\`\`bash
git status
git log --oneline -10
git diff
git stash
git reset --soft HEAD~1
\`\`\`

**Merge Conflicts:**
\`\`\`bash
git mergetool
git add .
git commit -m "Resolved conflicts"
\`\`\`

**Undo Changes:**
- Unstaged: \`git checkout -- file\`
- Staged: \`git reset HEAD file\`
- Committed: \`git revert commit\`

Git workflow design? ${PHONE}` },

// ══════════════════════════════════════════════════════════════════════════════
// AI & MACHINE LEARNING
// ══════════════════════════════════════════════════════════════════════════════

ai: { kw: ['ai', 'artificial intelligence', 'machine learning', 'ml', 'chatgpt', 'gpt', 'llm', 'model'],
r: `**AI/ML Troubleshooting (L3):**

**Common AI Platforms:**
- OpenAI (GPT-4, ChatGPT)
- Google (Gemini, Vertex AI)
- Azure OpenAI
- AWS Bedrock
- Local: Ollama, LM Studio

**API Issues:**
1. **401/403:** Check API key, permissions
2. **429:** Rate limited, implement backoff
3. **500:** Service issue, retry logic

**Integration Tips:**
\`\`\`python
import openai
openai.api_key = "key"
response = openai.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "Hello"}]
)
\`\`\`

**Fine-tuning:** Training data quality, validation set

AI implementation? ${PHONE}` },

chatbot: { kw: ['chatbot', 'bot', 'conversational ai', 'virtual assistant'],
r: `**Chatbot Development (L3):**

**Platforms:**
- Microsoft Bot Framework
- Dialogflow (Google)
- Amazon Lex
- Rasa (Open source)

**Key Components:**
1. **NLU:** Intent recognition, entity extraction
2. **Dialog Management:** Conversation flow
3. **Integration:** APIs, databases, CRM

**Best Practices:**
- Handle fallbacks gracefully
- Maintain context
- Human handoff option
- Analytics & improvement

Custom chatbot? ${PHONE}` },

prompt: { kw: ['prompt', 'prompt engineering', 'chatgpt prompt', 'ai prompt'],
r: `**Prompt Engineering (L3):**

**Techniques:**
1. **Zero-shot:** Direct question
2. **Few-shot:** Provide examples
3. **Chain-of-thought:** "Let's think step by step"
4. **Role-based:** "You are an expert..."

**Best Practices:**
\`\`\`
Be specific and clear
Provide context
Use delimiters for sections
Specify output format
Include examples
\`\`\`

**Advanced:**
- System prompts for behavior
- Temperature for creativity
- Max tokens for length

AI consulting? ${PHONE}` },

// ══════════════════════════════════════════════════════════════════════════════
// IOT & HARDWARE
// ══════════════════════════════════════════════════════════════════════════════

iot: { kw: ['iot', 'internet of things', 'sensor', 'mqtt', 'smart device'],
r: `**IoT Troubleshooting (L3):**

**Connectivity:**
- WiFi/Ethernet config
- MQTT broker connection
- Cloud platform (Azure IoT, AWS IoT)

**Protocols:**
- MQTT: Lightweight pub/sub
- CoAP: UDP-based REST
- HTTP: Standard API calls
- Modbus: Industrial

**Common Issues:**
1. Device offline: Network, power, firmware
2. Data not appearing: Topic subscription, payload format
3. Security: TLS, device certificates

IoT architecture? ${PHONE}` },

hardware: { kw: ['hardware', 'monitor', 'keyboard', 'mouse', 'usb', 'sound', 'audio', 'no sound'],
r: `**Hardware Troubleshooting:**

**Display:**
- Check cables/ports
- Try different monitor
- Update graphics driver

**No Sound:**
1. Volume & mute settings
2. Output device selection
3. Driver update
4. Windows Audio service

**USB Issues:**
1. Different port
2. Device Manager → USB Controllers → Uninstall
3. Check power management

Hardware procurement? ${PHONE}` },

printer: { kw: ['printer', 'print', 'not printing', 'print queue', 'offline'],
r: `**Printer Troubleshooting:**

**Clear Queue:**
\`\`\`cmd
net stop spooler
del /Q %systemroot%\\System32\\spool\\PRINTERS\\*
net start spooler
\`\`\`

**Network Printer:**
1. Ping printer IP
2. Web interface access
3. Driver compatibility
4. Port configuration

**Common Fixes:**
- Set as default
- Update drivers
- Check ink/toner

Print management? ${PHONE}` },

// ══════════════════════════════════════════════════════════════════════════════
// VOIP & COLLABORATION
// ══════════════════════════════════════════════════════════════════════════════

voip: { kw: ['voip', 'sip', 'pbx', '3cx', 'phone system', 'asterisk'],
r: `**VoIP Troubleshooting (L3):**

**SIP Issues:**
- Registration failures: Credentials, NAT
- One-way audio: NAT/firewall, RTP ports
- Echo: Acoustic or network delay

**Ports:**
- SIP: 5060 (UDP/TCP), 5061 (TLS)
- RTP: 10000-20000 (UDP)

**QoS:** Prioritize voice traffic, <150ms latency

**Diagnostics:**
- Wireshark SIP filter
- VoIP quality testing tools
- SIP debug on PBX

Phone system setup? ${PHONE}` },

// ══════════════════════════════════════════════════════════════════════════════
// MONITORING
// ══════════════════════════════════════════════════════════════════════════════

monitoring: { kw: ['monitoring', 'zabbix', 'prtg', 'nagios', 'grafana', 'prometheus'],
r: `**Monitoring Solutions (L3):**

**Popular Tools:**
- **PRTG:** Windows-based, easy setup
- **Zabbix:** Open source, scalable
- **Prometheus + Grafana:** Cloud-native
- **Nagios:** Classic Linux monitoring

**Key Metrics:**
- CPU, Memory, Disk
- Network bandwidth
- Service availability
- Response time

**Best Practices:**
- Alert thresholds with escalation
- Dashboard for visibility
- Trend analysis
- Capacity planning

Monitoring setup? ${PHONE}` },

// ══════════════════════════════════════════════════════════════════════════════
// COMPLIANCE
// ══════════════════════════════════════════════════════════════════════════════

compliance: { kw: ['compliance', 'popia', 'gdpr', 'pci', 'audit', 'regulation'],
r: `**Compliance Support (L3):**

**POPIA (South Africa):**
- Lawful processing
- Data subject consent
- Security safeguards
- Breach notification

**GDPR:**
- Data protection by design
- Right to erasure
- Data portability

**PCI-DSS:**
- Secure cardholder data
- Network segmentation
- Vulnerability management

**Audit Prep:**
- Document policies
- Access control evidence
- Log retention

Compliance consulting? ${PHONE}` },

// ══════════════════════════════════════════════════════════════════════════════
// BASIC USER SUPPORT
// ══════════════════════════════════════════════════════════════════════════════

slow: { kw: ['slow', 'performance', 'freezing', 'lag', 'computer slow'],
r: `**Performance Troubleshooting:**

**Quick Checks:**
1. Task Manager → CPU/Memory/Disk
2. Identify heavy processes
3. Restart computer

**Solutions:**
- Disable startup programs
- Run disk cleanup
- Check for malware
- SSD upgrade

**PowerShell:**
\`\`\`powershell
Get-Process | Sort CPU -Desc | Select -First 10
\`\`\`

Performance optimization? ${PHONE}` },

email: { kw: ['email', 'outlook', 'mail not working', 'cant send email'],
r: `**Email Troubleshooting:**

**Outlook:**
1. Safe mode: \`outlook.exe /safe\`
2. Repair profile
3. Clear cache: \`%localappdata%\\Microsoft\\Outlook\`

**Settings:**
- IMAP: 993 (SSL)
- SMTP: 587 (TLS)

**Autodiscover test:** Ctrl+Right-click Outlook tray icon

Email setup? ${PHONE}` },

// ══════════════════════════════════════════════════════════════════════════════
// HARDWARE - LAPTOPS
// ══════════════════════════════════════════════════════════════════════════════

hp_laptop: { kw: ['hp laptop', 'hp elitebook', 'hp probook', 'hp pavilion', 'hp envy', 'hp spectre', 'hp zbook'],
r: `**HP Laptop Troubleshooting:**

**HP Diagnostics (Built-in):**
- Power on → Press **F2** repeatedly for HP PC Hardware Diagnostics
- Or press **Esc** → F2 for diagnostics menu

**HP Support Assistant:**
- Pre-installed tool for drivers/updates
- Download: support.hp.com

**Common Issues:**

1. **Won't Power On:**
   - Hard reset: Remove battery, hold power 15 sec
   - Check AC adapter LED
   - Try different outlet

2. **Battery Not Charging:**
   - Check battery health in BIOS (F10)
   - Update BIOS firmware
   - Reset battery: Unplug, remove battery, hold power 30 sec

3. **Overheating:**
   - Clean vents with compressed air
   - Update BIOS for fan control
   - Check HP CoolSense settings

4. **Black Screen:**
   - External monitor test
   - Hard reset
   - Check RAM seating

**BIOS Access:** F10 at startup
**Boot Menu:** F9 at startup
**Recovery:** F11 at startup

**HP Support:** 1-800-474-6836 | support.hp.com

HP repairs? ${PHONE}` },

dell_laptop: { kw: ['dell laptop', 'dell latitude', 'dell xps', 'dell inspiron', 'dell precision', 'dell vostro', 'dell alienware'],
r: `**Dell Laptop Troubleshooting:**

**Dell Diagnostics:**
- Power on → Press **F12** → Select "Diagnostics"
- Or hold **Fn** key while powering on
- Pre-boot: Press **F12** at Dell logo

**SupportAssist:**
- Built-in diagnostic tool
- Download: dell.com/support

**LED Diagnostic Codes (Blinking):**
- 2 Amber, 3 White = Memory not detected
- 2 Amber, 4 White = Memory failure
- 3 Amber, 1 White = No graphics card
- 3 Amber, 2 White = LCD failure

**Common Issues:**

1. **Won't Turn On:**
   - Disconnect all peripherals
   - Remove battery, hold power 30 sec
   - Try AC only (no battery)

2. **No Display:**
   - Fn + F8 to toggle display
   - Connect external monitor
   - Reseat RAM

3. **Battery Issues:**
   - Check battery health: Dell Power Manager
   - BIOS update for charging issues
   - Battery calibration

4. **Overheating/Fan Noise:**
   - Clean vents
   - Update thermal management in Dell Power Manager
   - Repaste CPU if old

**BIOS Access:** F2 at startup
**Boot Menu:** F12 at startup
**Recovery:** Ctrl + F11

**Dell Support:** 1-800-624-9897 | dell.com/support

Dell repairs? ${PHONE}` },

lenovo_laptop: { kw: ['lenovo laptop', 'thinkpad', 'ideapad', 'lenovo legion', 'lenovo yoga', 'thinkbook'],
r: `**Lenovo/ThinkPad Troubleshooting:**

**Lenovo Diagnostics:**
- Power on → Press **F10** for diagnostics
- Or **Fn + F10** on some models
- Lenovo Vantage app for Windows diagnostics

**ThinkPad LED Codes:**
- 1 blink = System board
- 3 blinks = Memory
- 4 blinks = Graphics
- 5 blinks = Video subsystem

**Common Issues:**

1. **ThinkPad Won't Boot:**
   - Power drain: Unplug, remove battery, hold power 30 sec
   - Remove dock if connected
   - Check Novo button (small hole, side of laptop)

2. **TrackPoint/TouchPad Issues:**
   - Driver update via Lenovo Vantage
   - Check Fn + F6 toggle
   - BIOS settings for touchpad

3. **Docking Station Issues:**
   - Update dock firmware
   - USB-C cable quality matters
   - Check Thunderbolt drivers

4. **Battery/Charging:**
   - Lenovo Vantage → Battery settings
   - Conservation mode for longevity
   - Check power adapter wattage

**BIOS Access:** F1 at startup (ThinkPad) | F2 (IdeaPad)
**Boot Menu:** F12 at startup
**Recovery/Novo:** Small button on side

**Lenovo Support:** 1-855-253-6686 | support.lenovo.com

Lenovo repairs? ${PHONE}` },

asus_laptop: { kw: ['asus laptop', 'asus rog', 'asus zenbook', 'asus vivobook', 'asus tuf'],
r: `**ASUS Laptop Troubleshooting:**

**ASUS Diagnostics:**
- MyASUS app → System Diagnosis
- Power on → Hold **F9** for recovery
- BIOS built-in diagnostics

**Common Issues:**

1. **Won't Turn On:**
   - Hard reset: Unplug, hold power 40 seconds
   - Try: Hold power + press refresh key 3 times
   - Check charging LED

2. **ROG/Gaming Laptop Thermal:**
   - Armoury Crate for fan control
   - Clean dust from vents
   - Elevate laptop for airflow
   - Gaming mode vs Silent mode

3. **Keyboard Backlight:**
   - Fn + F3/F4 for brightness
   - Aura Sync for RGB (ROG)
   - Check BIOS settings

4. **Display Issues:**
   - Fn + F6 to toggle display
   - Update Intel/NVIDIA drivers
   - Check resolution scaling

5. **Battery Not Charging:**
   - MyASUS → Battery health
   - BIOS update
   - Check adapter wattage

**BIOS Access:** F2 or Delete at startup
**Boot Menu:** Esc or F8 at startup
**Recovery:** F9 at startup

**ASUS Support:** 1-812-282-2787 | asus.com/support

ASUS repairs? ${PHONE}` },

acer_laptop: { kw: ['acer laptop', 'acer aspire', 'acer nitro', 'acer swift', 'acer predator', 'acer spin'],
r: `**Acer Laptop Troubleshooting:**

**Acer Diagnostics:**
- Acer Care Center app
- Power on → Press **F2** for BIOS diagnostics
- Alt + F10 for recovery

**Common Issues:**

1. **Won't Power On:**
   - Battery reset: Hold power 30 seconds
   - Disconnect AC, remove battery if possible
   - Check for pinhole reset button

2. **Overheating (Nitro/Predator):**
   - NitroSense/PredatorSense for fan control
   - CoolBoost feature
   - Clean vents regularly

3. **WiFi Problems:**
   - Fn + F3 to toggle WiFi
   - Update wireless drivers
   - Check BIOS for wireless enable

4. **Display Flickering:**
   - Update graphics drivers
   - Check refresh rate settings
   - Reseat display cable (advanced)

5. **Keyboard Not Working:**
   - Check Fn lock status
   - External keyboard test
   - Driver reinstall

**BIOS Access:** F2 at startup
**Boot Menu:** F12 at startup
**Recovery:** Alt + F10

**Acer Support:** 1-866-695-2237 | acer.com/support

Acer repairs? ${PHONE}` },

apple_mac: { kw: ['mac', 'macbook', 'imac', 'mac mini', 'mac studio', 'mac pro', 'apple', 'macos', 'macbook pro', 'macbook air'],
r: `**Apple Mac Troubleshooting:**

**Apple Diagnostics:**
- **Intel Mac:** Hold **D** at startup
- **Apple Silicon:** Hold power → Options → Diagnostics
- Reference codes at support.apple.com/diagnostics

**Common Issues:**

1. **Won't Turn On:**
   - SMC Reset (Intel): Shift+Ctrl+Option+Power
   - Apple Silicon: Hold power 10 sec, release, press again
   - Check MagSafe/USB-C LED

2. **Slow Performance:**
   - Activity Monitor for CPU/Memory
   - Restart to clear RAM
   - Check Storage (About This Mac)
   - Safe Mode boot: Hold Shift

3. **Battery Issues:**
   - System Preferences → Battery → Health
   - SMC reset for charging issues
   - Check cycle count (Option + click Battery icon)

4. **Kernel Panic:**
   - Safe Mode: Hold Shift at boot
   - Reset NVRAM: Command+Option+P+R
   - Check third-party software

5. **WiFi/Bluetooth:**
   - Delete network preferences
   - Reset Bluetooth module (Option+Shift+click BT icon)

**Recovery Mode:** Command + R
**Safe Mode:** Hold Shift
**NVRAM Reset:** Command+Option+P+R
**Verbose Mode:** Command + V

**Apple Support:** 1-800-275-2273 | support.apple.com

Mac repairs? ${PHONE}` },

// ══════════════════════════════════════════════════════════════════════════════
// HARDWARE - DESKTOPS
// ══════════════════════════════════════════════════════════════════════════════

hp_desktop: { kw: ['hp desktop', 'hp prodesk', 'hp elitedesk', 'hp z workstation', 'hp compaq', 'hp all-in-one'],
r: `**HP Desktop Troubleshooting:**

**HP Diagnostics:**
- Power on → **F2** for HP PC Hardware Diagnostics
- LED/Beep codes indicate issues

**Beep Codes:**
- 1 short = Hardware OK
- 2 short = POST error (check display)
- 3 long = Memory error
- 5 short = Processor failure

**LED Blinks (Power button):**
- 2 Red = BIOS corruption
- 3 Red = Processor not detected
- 4 Red = Power failure
- 5 Red = Memory error

**Common Issues:**

1. **No Power:**
   - Check power cable & outlet
   - Test PSU switch on back
   - Clear CMOS (jumper on motherboard)

2. **No Display:**
   - Reseat graphics card
   - Try integrated graphics
   - Reseat RAM

3. **Overheating:**
   - Clean dust from fans/heatsinks
   - Check thermal paste
   - Ensure proper ventilation

**BIOS:** F10 | **Boot Menu:** F9

HP desktop repairs? ${PHONE}` },

dell_desktop: { kw: ['dell desktop', 'dell optiplex', 'dell precision workstation', 'dell xps desktop', 'dell inspiron desktop'],
r: `**Dell Desktop Troubleshooting:**

**Dell Diagnostics:**
- Power on → **F12** → Diagnostics
- Dell SupportAssist in Windows

**Diagnostic LEDs (Front Panel):**
- 1 Amber = Memory failure
- 2 Amber = Motherboard failure
- 3 Amber = BIOS recovery
- 4 Amber = Power supply

**Beep Codes:**
- 1 = BIOS checksum failure
- 2 = No RAM detected
- 3 = Motherboard failure
- 4 = RAM read/write failure
- 5 = RTC failure
- 6 = Video card failure

**Common Issues:**

1. **No Boot:**
   - Clear CMOS (jumper or button)
   - Reseat components
   - Minimum config: 1 RAM stick, no GPU

2. **Amber Light Solid:**
   - Power supply issue
   - Check connections
   - Test with known good PSU

3. **Random Shutdowns:**
   - Thermal issue - clean dust
   - Check PSU capacitors
   - Event Viewer for errors

**BIOS:** F2 | **Boot Menu:** F12

Dell desktop repairs? ${PHONE}` },

// ══════════════════════════════════════════════════════════════════════════════
// HARDWARE - SERVERS
// ══════════════════════════════════════════════════════════════════════════════

hp_server: { kw: ['hp server', 'hpe server', 'proliant', 'hp proliant', 'ilo', 'dl380', 'dl360', 'ml350'],
r: `**HP/HPE ProLiant Server Troubleshooting:**

**iLO Remote Access:**
- Access via dedicated iLO port or shared
- Default: https://ilo-IP
- iLO for health, console, power control

**Intelligent Provisioning:**
- Press **F10** at boot
- Built-in diagnostics, deployment

**LED Indicators:**
- **UID (Blue):** Identification
- **Health (Amber):** Degraded - check iLO
- **Power (Green):** On/standby

**Common Issues:**

1. **Server Won't POST:**
   - Check system health LED
   - Reseat DIMMs, CPUs
   - Clear NVRAM in maintenance switch
   - iLO Integrated Management Log

2. **RAID Issues:**
   - Smart Array controller
   - Check iLO for drive status
   - HPE SSA (Smart Storage Administrator)

3. **Memory Errors:**
   - Advanced Memory Protection
   - iLO shows failed DIMM slot
   - Replace DIMM, same spec

4. **Overheating:**
   - Check fan status in iLO
   - Clean dust
   - Verify airflow with blanks

**Tools:** HPE SSA, iLO, Intelligent Provisioning

Server support? ${PHONE}` },

dell_server: { kw: ['dell server', 'dell poweredge', 'poweredge', 'idrac', 'r740', 'r640', 'r750'],
r: `**Dell PowerEdge Server Troubleshooting:**

**iDRAC Remote Access:**
- Dedicated or shared iDRAC port
- Default: https://idrac-IP
- Remote console, health, power control

**Lifecycle Controller:**
- Press **F10** at boot
- Diagnostics, deployment, updates

**LED Indicators:**
- **ID (Blue):** Identification button
- **Status (Amber):** Degraded - check iDRAC
- **Power (Green):** On/standby

**LCD Panel Codes:**
- Error codes displayed on front panel
- Reference Dell error code database

**Common Issues:**

1. **No POST:**
   - Amber LCD = check code
   - Reseat memory, CPUs
   - Check iDRAC logs
   - Minimum config boot

2. **RAID Issues (PERC):**
   - iDRAC → Storage
   - Dell OpenManage
   - Check virtual disk health
   - Battery backup status

3. **Memory Errors:**
   - iDRAC shows failed slot
   - Memory mirroring/sparing
   - Replace matching DIMMs

4. **PSU Failures:**
   - Redundant hot-swap
   - Check amber PSU LED
   - Log in iDRAC Lifecycle

**Tools:** iDRAC, Lifecycle Controller, OpenManage

Server support? ${PHONE}` },

// ══════════════════════════════════════════════════════════════════════════════
// HARDWARE - COMPONENTS
// ══════════════════════════════════════════════════════════════════════════════

ram: { kw: ['ram', 'memory', 'dimm', 'memory error', 'ram not detected', 'blue screen memory'],
r: `**RAM/Memory Troubleshooting:**

**Windows Memory Diagnostic:**
\`\`\`cmd
mdsched.exe
\`\`\`
Or: Start → "Windows Memory Diagnostic"

**Symptoms of Bad RAM:**
- Blue screens (MEMORY_MANAGEMENT, PAGE_FAULT)
- Random restarts
- System won't POST
- Beep codes at startup
- Corrupted files

**Troubleshooting Steps:**

1. **Reseat RAM:**
   - Power off, unplug
   - Remove and reinstall DIMMs
   - Ensure clicks in place

2. **Test Individual Sticks:**
   - One stick at a time
   - Try different slots
   - Identify faulty module

3. **Check Compatibility:**
   - Same speed, timing, voltage
   - Check motherboard QVL
   - DDR4 vs DDR5 not interchangeable

4. **BIOS Settings:**
   - Enable XMP/DOCP for rated speed
   - Memory training
   - Check voltage

**Tools:**
- MemTest86 (bootable USB)
- Windows Memory Diagnostic
- HWiNFO64 for specs

**Specs to Match:**
- Type (DDR4/DDR5)
- Speed (MHz)
- CAS Latency (CL)
- Voltage

RAM upgrades? ${PHONE}` },

cpu: { kw: ['cpu', 'processor', 'cpu overheating', 'cpu throttling', 'high cpu', 'processor not detected'],
r: `**CPU Troubleshooting:**

**Symptoms of CPU Issues:**
- No POST (no beeps)
- Immediate shutdown
- Thermal throttling (slow performance)
- Blue screens
- Bent pins (AMD) or socket damage

**Temperature Monitoring:**
\`\`\`powershell
Get-WmiObject MSAcpi_ThermalZoneTemperature -Namespace "root/wmi"
\`\`\`
Or use: HWiNFO64, Core Temp, HWMonitor

**Safe Temps:**
- Idle: 30-50°C
- Load: 60-85°C
- Max (throttle): 100°C+

**Troubleshooting:**

1. **Overheating:**
   - Clean heatsink/fan
   - Replace thermal paste
   - Check cooler mounting
   - Improve case airflow

2. **CPU Not Detected:**
   - Check BIOS compatibility
   - Reseat CPU carefully
   - Inspect for bent pins (AMD)
   - Check power connectors (8-pin)

3. **Throttling:**
   - Check temps under load
   - Disable power limits in BIOS
   - Better cooling solution

4. **100% CPU Usage:**
   - Task Manager → identify process
   - Check for malware
   - Background services

**Tools:** HWiNFO64, Core Temp, CPU-Z, Cinebench (stress test)

CPU issues? ${PHONE}` },

gpu: { kw: ['gpu', 'graphics card', 'video card', 'nvidia', 'amd radeon', 'no display', 'gpu not detected', 'driver crash'],
r: `**GPU/Graphics Card Troubleshooting:**

**No Display:**
1. Check cable (HDMI/DP/DVI)
2. Try different port
3. Try integrated graphics
4. Reseat GPU
5. Check PCIe power connectors
6. Test in different PCIe slot

**Driver Issues:**
\`\`\`cmd
:: NVIDIA
nvidia-smi

:: Clean install
DDU (Display Driver Uninstaller) in Safe Mode
\`\`\`

**Symptoms of GPU Failure:**
- Artifacts (weird colors, lines)
- Driver crashes
- Black screen with fans spinning
- No display output
- System freezes in games

**Troubleshooting:**

1. **Driver Crash:**
   - DDU clean uninstall
   - Fresh driver install
   - Try older stable driver

2. **Artifacts/Glitches:**
   - Check GPU temperature
   - Underclock memory/core
   - Could indicate dying GPU

3. **GPU Not Detected:**
   - Reseat in PCIe slot
   - Check 6/8-pin power
   - Try different slot
   - BIOS PCIe settings

4. **Overheating:**
   - Clean dust from fans
   - Repaste (advanced)
   - Improve case airflow
   - Undervolt for lower temps

**Tools:** GPU-Z, MSI Afterburner, DDU, FurMark (stress test)

GPU repairs? ${PHONE}` },

ssd_hdd: { kw: ['ssd', 'hard drive', 'hdd', 'disk', 'drive not detected', 'disk failure', 'slow disk', 'nvme'],
r: `**SSD/HDD Troubleshooting:**

**Health Check:**
\`\`\`powershell
Get-PhysicalDisk | Select FriendlyName, HealthStatus, OperationalStatus
wmic diskdrive get status
\`\`\`

**SMART Data:**
- CrystalDiskInfo (free tool)
- Check for warnings/errors

**Drive Not Detected:**

1. **Check Connections:**
   - SATA data + power cables
   - NVMe seated properly
   - Try different port

2. **BIOS Check:**
   - Drive visible in BIOS?
   - SATA mode (AHCI vs RAID)
   - NVMe vs SATA M.2

3. **Disk Management:**
   - diskmgmt.msc
   - Initialize if new drive
   - Assign drive letter

**Slow Performance:**
- Check TRIM enabled (SSD)
- Defrag HDD only (never SSD)
- Check for errors: \`chkdsk /f\`
- Firmware update

**Data Recovery:**
- DO NOT write to failing drive
- Professional recovery for critical data
- Clone drive immediately if accessible

**SSD Lifespan:**
- Check TBW (Total Bytes Written)
- SMART attributes
- 5+ years typical for quality SSDs

**Tools:** CrystalDiskInfo, CrystalDiskMark, HD Tune

Data recovery? ${PHONE}` },

psu: { kw: ['psu', 'power supply', 'no power', 'random shutdown', 'pc wont turn on'],
r: `**Power Supply (PSU) Troubleshooting:**

**Symptoms of PSU Failure:**
- PC won't power on at all
- Random shutdowns under load
- Burning smell
- Clicking/buzzing noise
- Unstable voltages

**Basic Tests:**

1. **Paperclip Test:**
   - Disconnect from motherboard
   - Short green wire to black on 24-pin
   - Fan should spin (confirms PSU turns on)

2. **Check Connections:**
   - 24-pin motherboard
   - 8-pin CPU
   - GPU power (6/8-pin)
   - All seated firmly

3. **Test with Multimeter:**
   - +12V (yellow): 11.4-12.6V
   - +5V (red): 4.75-5.25V
   - +3.3V (orange): 3.1-3.5V

**Troubleshooting:**

1. **No Power:**
   - Check wall outlet
   - Check PSU switch
   - Paperclip test
   - Try different PSU

2. **Random Shutdowns:**
   - Insufficient wattage for load
   - Check Event Viewer (Kernel-Power 41)
   - Test with higher wattage PSU

3. **Choosing PSU:**
   - 80+ certification (Bronze, Gold, Platinum)
   - Wattage = (CPU TDP + GPU TDP) × 1.5
   - Quality brands: Corsair, EVGA, Seasonic

**Safety:** Never open PSU - capacitors hold lethal charge!

PSU replacement? ${PHONE}` },

motherboard: { kw: ['motherboard', 'mobo', 'mainboard', 'no post', 'bios corrupt', 'chipset'],
r: `**Motherboard Troubleshooting:**

**No POST Diagnosis:**

1. **Check Debug LEDs/Display:**
   - CPU, DRAM, VGA, BOOT indicators
   - Q-Code display (2-digit code)

2. **Beep Codes:**
   - No beep = no POST
   - Continuous beep = memory issue
   - Refer to motherboard manual

3. **Minimum Config Test:**
   - CPU + 1 RAM stick only
   - No GPU, drives, or peripherals
   - Integrated graphics

**Common Issues:**

1. **Dead Board:**
   - Check PSU with paperclip test
   - Verify CPU power (8-pin) connected
   - Clear CMOS
   - Inspect for physical damage

2. **BIOS Corrupt:**
   - Clear CMOS (jumper or battery)
   - USB BIOS Flashback if available
   - Remove battery 5 min

3. **USB/Ports Not Working:**
   - Check BIOS settings
   - Update chipset drivers
   - Try different USB header

4. **Boot Loop:**
   - Clear CMOS
   - Check RAM compatibility
   - Remove recent hardware

**CMOS Clear:**
1. Power off, unplug
2. Remove battery 5 min OR
3. Use CLRTC jumper

**Tools:** POST card, multimeter, debug LEDs

Motherboard replacement? ${PHONE}` },

bios: { kw: ['bios', 'uefi', 'cmos', 'bios update', 'bios settings', 'boot order', 'secure boot'],
r: `**BIOS/UEFI Troubleshooting:**

**Accessing BIOS:**
| Brand | Key |
|-------|-----|
| HP | F10 |
| Dell | F2 |
| Lenovo | F1/F2 |
| ASUS | Del/F2 |
| Acer | F2/Del |
| MSI | Del |
| Gigabyte | Del |

**Common Tasks:**

1. **Change Boot Order:**
   - Find Boot/Startup section
   - Move preferred device to top
   - Save & Exit (F10)

2. **Enable Virtualization:**
   - Intel: VT-x (Intel Virtualization)
   - AMD: AMD-V/SVM Mode
   - Required for Hyper-V, VMware

3. **Secure Boot:**
   - Security section
   - Enable for Windows 11
   - Disable for Linux dual-boot (sometimes)

4. **XMP/DOCP:**
   - Enable for RAM rated speed
   - Memory/OC section

**BIOS Update:**
\`\`\`
1. Download from manufacturer
2. Extract to USB (FAT32)
3. BIOS → EZ Flash/Q-Flash
4. Select file → Update
5. DO NOT POWER OFF!
\`\`\`

**CMOS Reset:**
1. Clear CMOS jumper (3-pin)
2. OR remove battery 5 min
3. Resets all BIOS settings

**BIOS Recovery:**
- USB BIOS Flashback (ASUS, MSI)
- Rename file to specific name
- Connect to designated USB port

BIOS help? ${PHONE}` },

monitor: { kw: ['monitor', 'display', 'screen', 'no signal', 'flickering', 'dead pixels', 'resolution'],
r: `**Monitor Troubleshooting:**

**No Signal:**

1. **Check Connections:**
   - Reseat cable both ends
   - Try different cable
   - Try different port (HDMI/DP/DVI)

2. **Input Source:**
   - Press Input/Source button
   - Select correct input

3. **Test with Another Device:**
   - Laptop, game console
   - Confirms monitor works

4. **Graphics Card:**
   - Reseat GPU
   - Try onboard graphics

**Display Issues:**

1. **Flickering:**
   - Check refresh rate (60Hz+)
   - Update GPU drivers
   - Try different cable
   - Check power source

2. **Dead Pixels:**
   - Stuck pixel fix videos (YouTube)
   - Gentle pressure technique
   - Usually manufacturer defect

3. **Wrong Resolution:**
   - Right-click desktop → Display settings
   - Select native resolution
   - Check GPU scaling settings

4. **Color Issues:**
   - Calibration: Settings → Display → Color
   - Check cable for damage
   - Monitor OSD color settings

**Multi-Monitor Setup:**
\`\`\`
Settings → Display → Multiple displays
- Extend/Duplicate
- Arrange monitors
- Set primary display
\`\`\`

Monitor issues? ${PHONE}` },

overheating: { kw: ['overheating', 'thermal', 'hot', 'fan loud', 'throttling', 'temperature'],
r: `**Overheating Troubleshooting:**

**Temperature Monitoring:**
- HWiNFO64 (detailed)
- Core Temp (CPU)
- GPU-Z (graphics)
- SpeedFan (legacy)

**Safe Temperatures:**
| Component | Idle | Load | Max |
|-----------|------|------|-----|
| CPU | 30-45°C | 60-80°C | 100°C |
| GPU | 30-45°C | 65-85°C | 95°C |
| SSD | 30-40°C | 50-70°C | 70°C |

**Cooling Solutions:**

1. **Immediate Steps:**
   - Clean dust (compressed air)
   - Check all fans spinning
   - Remove side panel temporarily
   - Improve cable management

2. **CPU Cooling:**
   - Stock cooler = basic (loud)
   - Tower cooler = better
   - AIO liquid = best
   - Repaste thermal compound

3. **Laptop Cooling:**
   - Cooling pad
   - Elevate rear for airflow
   - Clean vents
   - Undervolt CPU (ThrottleStop)

4. **Case Airflow:**
   - Intake fans (front/bottom)
   - Exhaust fans (rear/top)
   - Positive pressure recommended

**Thermal Paste Application:**
1. Clean old paste (isopropyl alcohol)
2. Pea-sized amount in center
3. Mounting pressure spreads it
4. Quality paste: Noctua NT-H1, Thermal Grizzly

Thermal issues? ${PHONE}` },

laptop_general: { kw: ['laptop', 'notebook', 'laptop not charging', 'laptop screen black', 'laptop wont turn on'],
r: `**General Laptop Troubleshooting:**

**Won't Turn On:**
1. Hard reset: Unplug, remove battery, hold power 30 sec
2. Try AC power only
3. Check adapter LED
4. Try different outlet
5. Look for charging light

**Black Screen:**
1. Shine flashlight - faint image? (backlight issue)
2. External monitor test
3. Fn + display toggle (F4/F7/F8)
4. Hard reset
5. RAM reseat

**Not Charging:**
1. Check adapter LED
2. Try different outlet
3. Inspect charging port
4. BIOS update
5. Battery reset (pinhole button)

**Keyboard Issues:**
1. External keyboard test
2. Check Fn lock
3. Driver reinstall
4. Check for liquid damage

**WiFi Not Working:**
1. Fn + WiFi toggle
2. Airplane mode off
3. Driver update
4. Check BIOS wireless enable

**Slow Performance:**
1. Check Task Manager
2. Thermals (throttling?)
3. SSD upgrade recommended
4. Clean startup programs

**Universal Tips:**
- Keep vents clear
- Use on hard surface
- Regular driver updates
- Battery health check

Laptop repairs? ${PHONE}` },

desktop_general: { kw: ['desktop', 'pc', 'computer', 'tower', 'pc wont boot', 'custom pc'],
r: `**General Desktop PC Troubleshooting:**

**Won't Power On:**
1. Check power cable & outlet
2. PSU switch on back
3. Paperclip PSU test
4. Check front panel connectors
5. Clear CMOS

**Powers On, No Display:**
1. Monitor input source
2. Reseat GPU
3. Try onboard graphics
4. Reseat RAM
5. Listen for beeps
6. Check debug LEDs

**Boot Loop:**
1. Clear CMOS
2. Remove new hardware
3. Minimum config (CPU, 1 RAM)
4. Check CPU power (8-pin)

**Random Crashes/Shutdowns:**
1. Check temperatures
2. PSU wattage adequate?
3. Run memtest86
4. Check Event Viewer

**Performance Issues:**
1. Task Manager → Performance
2. Temps (throttling?)
3. Disk health (CrystalDiskInfo)
4. RAM usage >80%?
5. Background processes

**New Build POST Checklist:**
- [ ] CPU power (8-pin)
- [ ] 24-pin motherboard power
- [ ] RAM fully clicked
- [ ] GPU in correct slot
- [ ] GPU power (6/8-pin)
- [ ] Front panel headers
- [ ] Monitor connected to GPU

PC building help? ${PHONE}` }

};

// ═══════════════════════════════════════════════════════════════════════════════
// SERVICE CLASS
// ═══════════════════════════════════════════════════════════════════════════════

class GeminiService {
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;
  private chatHistory: Array<{ role: string; parts: Array<{ text: string }> }> = [];
  private useAI = false;

  constructor() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (apiKey?.length > 10) {
      try {
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        this.useAI = true;
        this.initHistory();
      } catch { this.useAI = false; }
    }
  }

  private initHistory() {
    this.chatHistory = [
      { role: "user", parts: [{ text: `You are Aria, a professional service desk agent at Boraine Tech. You provide friendly, helpful customer service while troubleshooting technical issues. You maintain a professional yet approachable tone, always focusing on helping customers resolve their technical problems quickly and efficiently. You ask clarifying questions to better understand the issue before providing solutions. You follow proper service desk protocols and etiquette.\n\n${AI_SYSTEM_INSTRUCTION}` }] },
      { role: "model", parts: [{ text: "Hello! I'm Aria from the Boraine Tech service desk. I'm here to help you troubleshoot any technical issues you're experiencing. Could you please describe what's happening with your device or system??" }] }
    ];
  }

  private findKB(msg: string): string | null {
    const m = msg.toLowerCase();
    for (const [, v] of Object.entries(KB)) {
      if (v.kw.some(k => m.includes(k))) return v.r;
    }
    return null;
  }

  private getResponse(msg: string): string {
    const m = msg.toLowerCase();
    const kb = this.findKB(msg);
    if (kb) return kb;

    if (m.match(/^(hi|hello|hey|howzit)/)) {
      return `Hello! Welcome to **Boraine Tech IT Support**. My name is **Aria**, and I'm your service desk agent today.

I'm here to help you troubleshoot any technical issues you're experiencing. To assist you better, could you please tell me what's happening with your device or system? 

For example, you can let me know if:
- Your computer is running slowly
- You're having trouble connecting to the internet
- An application isn't working properly
- You're experiencing issues with email
- Your printer isn't responding

What seems to be the problem today?`;
    }

    if (m.includes('help') || m.includes('issue') || m.includes('problem')) {
      return `I'd be happy to help you troubleshoot that issue. To better assist you, I'll need to gather some information about the problem.

Could you please tell me:
1. What exactly are you experiencing?
2. When did this issue first occur?
3. What device are you using (desktop, laptop, etc.)?
4. Have you made any recent changes to your system?
5. Are there any error messages you're seeing?

This information will help me provide you with the most accurate troubleshooting steps.`;
    }

    if (m.includes('service') || m.includes('offer')) {
      return `Thank you for your interest in our services. We offer comprehensive IT support solutions including:

${SERVICES.map(s => `• **${s.title}** - ${s.description}`).join('\n')}

Would you like more information about any of these services? You can call us at ${PHONE} for a free consultation.`;
    }

    if (m.includes('contact') || m.includes('phone')) {
      return `Thank you for contacting Boraine Tech IT Support.

If you need immediate assistance, you can reach our service desk at:

📞 **${PHONE}** (Available 24/7 for emergencies)
📧 **Email:** ${EMAIL}
📍 **Location:** ${LOCATION}

${OWNER_NAME} - Lead Technical Architect

Our service desk team is available during business hours, with emergency support available 24/7. For non-urgent issues, we typically respond within 2 hours during business hours.`;
    }

    return `Hello! I'm **Aria**, your service desk agent at Boraine Tech IT Support. I'm here to help you resolve any technical issues you're experiencing.

I'll need to ask you some questions to better understand your issue:
- What exactly is happening with your device?
- When did you first notice the problem?
- Has anything changed recently on your system?

Based on your responses, I'll guide you through the appropriate troubleshooting steps to resolve your issue efficiently.`;
  }

  async sendMessage(userMessage: string): Promise<{ text: string; bookingData?: any }> {
    if (this.useAI && this.model) {
      try {
        this.chatHistory.push({ role: "user", parts: [{ text: userMessage }] });
        const chat = this.model.startChat({ history: this.chatHistory.slice(0, -1) });
        const result = await chat.sendMessage(userMessage);
        const text = result.response.text();
        this.chatHistory.push({ role: "model", parts: [{ text }] });
        return { text };
      } catch { this.useAI = false; }
    }

    const response = this.getResponse(userMessage);
    let bookingData = null;
    const m = userMessage.toLowerCase();
    if ((m.includes('book') || m.includes('consultation')) && m.includes('name')) {
      const match = userMessage.match(/(?:name is|i'm|i am)\s+([A-Za-z]+(?:\s+[A-Za-z]+)?)/i);
      if (match) bookingData = { clientName: match[1], topic: 'Technical Consultation', contactInfo: 'Via Aria' };
    }
    return { text: response, bookingData };
  }

  clearHistory() { this.initHistory(); this.useAI = !!this.model; }
}

export const geminiService = new GeminiService();
