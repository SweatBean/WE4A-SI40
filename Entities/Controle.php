<?php

namespace Entities;
use Doctrine\ORM\Mapping as ORM;
#[ORM\Entity]
class Controle
{
    private int $id_control;
    private int $id_cour;
    private float $coef;

}