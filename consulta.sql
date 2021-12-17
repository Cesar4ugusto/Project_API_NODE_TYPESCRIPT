select
  sum(valor) as valor,
  extract(
    month
    from
      data :: date
  ) as mes,
  extract(
    year
    from
      data :: date
  ) as ano
from
  sales
where
  data :: date >= cast(
    concat(
      extract(
        year
        from
          (current_date - INTERVAL '1 year')
      ),
      '-',
      extract(
        month
        from
          (current_date - INTERVAL '1 year')
      ),
      '-01'
    ) as date
  )
group by
  extract(
    month
    from
      data :: date
  ),
  extract(
    year
    from
      data :: date
  )
