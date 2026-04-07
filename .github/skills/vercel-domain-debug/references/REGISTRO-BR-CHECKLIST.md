# Registro.br Checklist

## When to use each option
- Use `Configurar endereçamento` when you only need to point site records to Vercel.
- Use `Alterar servidores DNS` only if you want Vercel or another provider to host the entire DNS zone.

## Common setup
- Apex domain: use the A record value Vercel requests.
- `www`: use the exact CNAME Vercel requests.
- Remove conflicting records for the same host.

## Propagation checks
- `nslookup -type=NS dominio.com.br`
- `nslookup -type=A dominio.com.br`
- `nslookup -type=CNAME www.dominio.com.br`

## Common pitfalls
- Wrong domain added in Vercel.
- `www` record missing entirely.
- Old redirect or hosting records still active.
- Nameserver changes made accidentally when only record edits were needed.